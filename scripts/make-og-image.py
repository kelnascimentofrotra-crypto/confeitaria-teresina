# Gera public/og-image.jpg (1200x630). Uso: python3 scripts/make-og-image.py <pasta-com-Manrope.ttf-e-logo> public/og-image.jpg
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

S = sys.argv[1]; OUT = sys.argv[2]
W, H, K = 1200, 630, 2           # renderiza em 2x e reduz (bordas mais limpas)
w, h = W * K, H * K
FONT = S + '/og/Manrope.ttf'

def font(size, weight):
    f = ImageFont.truetype(FONT, size * K); f.set_variation_by_axes([weight]); return f

yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
def radial(cx, cy, rx, ry):
    return np.clip(1 - np.sqrt(((xx - cx * K) / (rx * K)) ** 2 + ((yy - cy * K) / (ry * K)) ** 2), 0, 1)

# Fundo: azul-marinho quase preto com luzes azuis suaves
base = np.zeros((h, w, 3), np.float32); base[:] = (2, 4, 11)
for (cx, cy, rx, ry, col, pw) in [
    (300, 330, 520, 420, (6, 40, 120), 1.6),     # luz atrás do logo
    (300, 330, 260, 220, (8, 90, 230), 2.2),     # núcleo azul elétrico
    (1050, 80, 520, 300, (4, 22, 70), 1.8),      # brilho no canto superior direito
    (900, 640, 600, 220, (3, 18, 58), 1.6),      # base
]:
    g = radial(cx, cy, rx, ry) ** pw
    base += g[..., None] * np.array(col, np.float32)
img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), 'RGB').convert('RGBA')

# Grade tecnológica discreta, que some nas bordas
grid = Image.new('RGBA', (w, h), (0, 0, 0, 0)); gd = ImageDraw.Draw(grid)
for x in range(0, w, 60 * K): gd.line([(x, 0), (x, h)], fill=(60, 120, 255, 26), width=K)
for y in range(0, h, 60 * K): gd.line([(0, y), (w, y)], fill=(60, 120, 255, 26), width=K)
mask = (radial(820, 300, 760, 520) ** 0.9 * 255).astype(np.uint8)
grid.putalpha(Image.fromarray(np.minimum(np.asarray(grid)[..., 3], mask)))
img.alpha_composite(grid)

# Feixe de luz diagonal (inspirado no traço do "N")
beam = Image.new('RGBA', (w, h), (0, 0, 0, 0)); bd = ImageDraw.Draw(beam)
bd.polygon([(820 * K, -40 * K), (900 * K, -40 * K), (1260 * K, 520 * K), (1180 * K, 520 * K)], fill=(17, 120, 255, 70))
beam = beam.filter(ImageFilter.GaussianBlur(28 * K)); img.alpha_composite(beam)
line = Image.new('RGBA', (w, h), (0, 0, 0, 0)); ld = ImageDraw.Draw(line)
ld.line([(860 * K, -40 * K), (1220 * K, 520 * K)], fill=(120, 200, 255, 90), width=2 * K)
line = line.filter(ImageFilter.GaussianBlur(1.2 * K)); img.alpha_composite(line)

# Logo oficial (sem alterações), com brilho por trás
logo = Image.open(S + '/crops/logo_unscreen.png').convert('RGBA')
lw = 400 * K; lh = round(logo.height * lw / logo.width)
logo = logo.resize((lw, lh), Image.LANCZOS)
lx, ly = 300 * K - lw // 2, 318 * K - lh // 2
glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
tint = Image.new('RGBA', logo.size, (8, 122, 255, 0)); tint.putalpha(logo.getchannel('A').point(lambda v: int(v * 0.9)))
glow.alpha_composite(tint, (lx, ly)); glow = glow.filter(ImageFilter.GaussianBlur(26 * K))
img.alpha_composite(glow); img.alpha_composite(logo, (lx, ly))

# Divisor vertical luminoso
div = Image.new('RGBA', (w, h), (0, 0, 0, 0)); dd = ImageDraw.Draw(div)
for i in range(200 * K):
    y = 215 * K + i; a = int(200 * np.sin(np.pi * i / (200 * K)))
    dd.point([(560 * K, y), (560 * K + 1, y)], fill=(60, 160, 255, a))
img.alpha_composite(div.filter(ImageFilter.GaussianBlur(0.6 * K)))

# Texto
d = ImageDraw.Draw(img)
X = 610 * K
eyebrow = font(26, 800)
d.text((X, 212 * K), 'N E X A W E B  —', font=eyebrow, fill=(77, 163, 255, 255))
head = font(54, 800)
d.text((X - 2 * K, 252 * K), 'Sua presença digital', font=head, fill=(255, 255, 255, 255))
# "começa aqui." com degradê azul
txt = 'começa aqui.'; bbox = d.textbbox((0, 0), txt, font=head)
tw, th = bbox[2] - bbox[0] + 8 * K, bbox[3] + 10 * K
tmask = Image.new('L', (tw, th), 0); ImageDraw.Draw(tmask).text((0, 0), txt, font=head, fill=255)
grad = np.zeros((th, tw, 4), np.uint8)
t = np.linspace(0, 1, tw)[None, :]
grad[..., 0] = (10 + (17 - 10) * t); grad[..., 1] = (109 + (200 - 109) * t); grad[..., 2] = 255
grad[..., 3] = np.asarray(tmask)
gimg = Image.fromarray(grad, 'RGBA')
tglow = gimg.copy().filter(ImageFilter.GaussianBlur(10 * K))
img.alpha_composite(tglow, (X - 2 * K, 318 * K)); img.alpha_composite(gimg, (X - 2 * K, 318 * K))
# barra de destaque e endereço
bar = Image.new('RGBA', (w, h), (0, 0, 0, 0)); bdr = ImageDraw.Draw(bar)
bdr.rounded_rectangle([X, 412 * K, X + 92 * K, 417 * K], radius=3 * K, fill=(17, 140, 255, 255))
img.alpha_composite(bar.filter(ImageFilter.GaussianBlur(4 * K))); img.alpha_composite(bar)
d.text((X, 440 * K), 'nexawebagency1.vercel.app', font=font(22, 500), fill=(255, 255, 255, 150))

# Vinheta suave nas bordas
vig = (1 - radial(600, 315, 900, 560) ** 0.6) * 90
arr = np.asarray(img).astype(np.float32); arr[..., :3] = np.clip(arr[..., :3] - vig[..., None] * 0.6, 0, 255)
out = Image.fromarray(arr.astype(np.uint8), 'RGBA').convert('RGB').resize((W, H), Image.LANCZOS)
out.save(OUT, 'JPEG', quality=90, optimize=True, progressive=True)
print(out.size)
