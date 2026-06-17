# Atendia 🤖

> Assistente de atendimento inteligente via WhatsApp para pequenos negócios brasileiros.

## O que é o Atendia?

O Atendia é um SaaS que permite a pequenos negócios (barbearias, restaurantes, salões, clínicas, pet shops, etc) oferecer atendimento automatizado 24/7 via WhatsApp com inteligência artificial.

## Como funciona?

1. Cliente envia mensagem no WhatsApp do negócio
2. Mensagem é capturada via Z-API (webhook)
3. Backend consulta dados do negócio no banco
4. IA (Gemini) gera resposta contextualizada
5. Resposta é enviada de volta ao cliente via Z-API
6. Dono acompanha conversas no painel web

## Stack

| Componente | Tecnologia |
|---|---|
| Frontend/Backend | Next.js 15 (App Router) |
| Banco de dados | Supabase (PostgreSQL + RLS) |
| Autenticação | Clerk |
| IA | Google Gemini |
| WhatsApp | Z-API |
| Pagamentos | Mercado Pago |
| Deploy | Vercel |

## Funcionalidades

- ✅ Autenticação segura com 2FA
- ✅ Painel multi-tenant com isolamento por RLS
- ✅ Cadastro do negócio (serviços, horários, regras)
- ✅ Histórico de conversas
- ✅ Atendimento automático via IA
- ✅ Integração com WhatsApp via Z-API
- ✅ Pagamentos recorrentes via Mercado Pago
- ✅ Conformidade com LGPD
- ✅ Design responsivo (mobile + desktop)

## Planos

| Plano | Preço | Mensagens |
|---|---|---|
| Trial | Grátis | 100 mensagens / 7 dias |
| Básico | R$97/mês | 500 mensagens/mês |
| Pro | R$197/mês | Ilimitado |


## Licença

Proprietário — todos os direitos reservados.
