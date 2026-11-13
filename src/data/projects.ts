/**
 * Projetos reais da NEXAWEB.
 *
 * Adicione aqui SOMENTE projetos realmente desenvolvidos, com print real e,
 * se houver, o link do site no ar. Enquanto a lista estiver vazia, a seção de
 * portfólio mostra ilustrações dos formatos de projeto (marcadas como "Ilustração").
 *
 * Exemplo:
 *   import printLoja from '../assets/img/projects/loja.webp'
 *   {
 *     id: 'loja',
 *     name: 'Nome do cliente',
 *     year: '2026',
 *     image: printLoja,
 *     url: 'https://site-do-cliente.com.br',
 *     category: { pt: 'Site institucional', en: 'Corporate website' },
 *     description: { pt: 'Resumo curto do projeto.', en: 'Short project summary.' },
 *   },
 */
export interface Project {
  id: string
  name: string
  year?: string
  image: string
  url?: string
  category: { pt: string; en: string }
  description: { pt: string; en: string }
}

export const projects: Project[] = []
