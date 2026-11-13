/**
 * Dados de contato da NEXAWEB.
 *
 * IMPORTANTE: nenhum dado foi inventado. Preencha apenas com informações reais.
 * Canais vazios simplesmente não aparecem no site, e os botões de orçamento
 * levam para a seção de contato enquanto o WhatsApp não estiver configurado.
 */
export const site = {
  name: 'NEXAWEB',
  contact: {
    /** Somente dígitos, com DDI e DDD. Ex.: '5586900000000' */
    whatsapp: '',
    /** Ex.: 'contato@seudominio.com.br' */
    email: '',
    /** Usuário do Instagram, sem @. Ex.: 'nexaweb' */
    instagram: '',
  },
} as const
