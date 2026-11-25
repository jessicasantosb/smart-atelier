---
name: generating-owasp-report
description: >-
  Gera o relatório OWASP Top 10:2025 dos portais FaceEye em arquivo markdown,
  no mesmo formato de .docs/owasp-validating, com data, as 10 categorias,
  evidência no código e prioridade de correção. Use when the user asks to
  gerar o relatório OWASP, validação OWASP em .docs, owasp-validating,
  relatório dos dois portais, or a dated OWASP Top 10 report file.
---

# Relatório OWASP em `.docs/owasp-validating`

Escreva em **pt-BR**. Nomes de arquivo, API, classe e config ficam no original.

Esta skill **grava o relatório**. Não implemente correção. Não escreva exploit, payload, PoC nem passo de reprodução ofensiva.

Checklist das categorias: [owasp-top-10.md](../validating-owasp-top-10/owasp-top-10.md). Fonte: [OWASP Top 10:2025](https://owasp.org/Top10/2025/). Edição 2021 só se o usuário pedir; use o mapa nesse checklist.

## Onde gravar

Um arquivo, os dois portais no mesmo relatório, salvo escopo menor pedido pelo usuário:

`.docs/owasp-validating/YYYY-MM-DD-validacao-owasp-top-10.md`

`YYYY-MM-DD` é a data de hoje. A pasta do relatório é `owasp-validating`. Não sobrescreva um relatório de outra data. Se o arquivo do dia já existir, confirme antes de substituir.

Escopo padrão deste repositório:

- `portal_administrador` e `portal_operacional` (backend Django/DRF e frontend React/Vite/nginx)
- supply chain só onde afeta os portais: `.gitlab-ci.yml`, `docker-compose.prod.yml`, `integracao/email_broadcast_worker`

## Fluxo

1. Identificar stack, auth, banco, CI e deps a partir do código. Não invente versão.
2. Inventariar rotas, permissões, CORS/CSRF, cookies, crypto, SQL, XSS, logs, exceções, Docker, nginx e pipeline.
3. Percorrer as 10 categorias de 2025 com o checklist. SSRF entra em **A01**.
4. Para cada categoria: **Alinhado**, **Divergente** ou **Não observável**.
5. Gravar o arquivo no formato abaixo. Não omita categoria.
6. Conferir a contagem do resumo com os achados (Crítica, Alta, Média, Baixa, Informativa).

Evidência no repositório. Não invente vulnerabilidade nem CVE. Risco hipotético: marque **Hipótese** e diga o que confirmaria. Segredo: cite arquivo e variável, **sem o valor**, e peça rotação. Não cite linha cujo conteúdo seja a senha ou a chave.

Testes sugeridos são defensivos: autorização positiva e negativa, validação que rejeita entrada inválida, header, SCA. Mitigação no stack do projeto (permissão DRF, ORM parametrizado, cookie, nginx, CI).

## Formato do arquivo

Igual ao relatório já gravado nesta pasta. Vários achados na mesma categoria repetem **Onde**, **Divergência**, citação, **Mitigação** e **Referências**. Categoria alinhada: uma ou duas linhas de evidência, com caminho. Não observável: o que faltou (runtime, TLS na borda, SIEM, cloud).

Citação de código no formato do Cursor, com linhas reais:

````markdown
```12:15:portal_administrador/backend/apps/core/views/customer.py
# trecho que evidencia o controle
```
````

```markdown
# Validação OWASP Top 10:2025

**Data:** [dia de mês de ano]
**Escopo:** [portal_administrador e portal_operacional, ou o recorte pedido]
**Stack:** [versões lidas dos manifests]
**Limitações:** [runtime, TLS/HSTS na borda, SIEM, cloud, CVE não varrido]

## Resumo

- Divergências: N (Alta x / Média y / Baixa z / …)
- Categorias alinhadas: …
- Não observável: …

## Achados

### A0X:2025 — [nome oficial]
**Status:** Divergente | Alinhado | Não observável
**Severidade:** Alta (…); Média (…)

**Onde:** `caminho:início-fim` — [símbolo ou endpoint]

**Divergência:** [comportamento observado e controle esperado]

```inicio:fim:caminho
```

**Mitigação e correção:**
1. …
2. …
**Referências:** cheat sheet / ASVS / página da categoria

## Prioridade de correção

1. **Alta —** …
```

A prioridade lista correção, da severidade maior para a menor. Cada item diz o que mudar, sem receita de ataque.

## Regras deste repositório

- Os dois portais compartilham modelo de auth. Confira se um JWT de um portal vale no outro (`aud`/`iss`, `SECRET_KEY` no compose) antes de tratar um controle como isolado.
- Controle alinhado (deny-by-default, tenant, CSRF, cookie `HttpOnly`, SQL parametrizado) entra em uma ou duas linhas na categoria, não vira achado.
- Não altere aplicação, Docker, CI nem `.env` durante a geração do relatório.
