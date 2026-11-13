import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

/**
 * <img> com fallback visual: se o arquivo falhar (rede, 404), mostra um bloco
 * escuro com luz azul do mesmo tamanho, em vez de ícone quebrado ou espaço vazio.
 * As dimensões (width/height) evitam saltos de layout durante o carregamento.
 */
export function Img({ className, style, alt = '', width, height, onError, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn(className, 'img-fallback')}
        style={{ ...style, aspectRatio: width && height ? `${width} / ${height}` : undefined }}
      />
    )
  }
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
      {...rest}
    />
  )
}
