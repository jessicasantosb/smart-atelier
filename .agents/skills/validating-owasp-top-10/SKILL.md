---
name: validating-owasp-top-10
description: Valida um projeto contra o OWASP Top 10 (edição 2025), identifica erros e divergências com evidência no código/config, e indica onde está o problema e o que usar para mitigar e corrigir. Use when the user asks to validate OWASP, Top 10, AppSec, auditoria de segurança, divergências OWASP, broken access control, injection, misconfiguration, supply chain, or revisão de riscos web.
---

# Validação OWASP Top 10

Sempre escreva o relatório em **pt-BR**. Nomes de arquivos, APIs, classes e configs permanecem no original.

Fonte oficial: [OWASP Top 10:2025](https://owasp.org/Top10/2025/). Se o usuário pedir explicitamente a edição 2021, use o mapeamento em [owasp-top-10.md](owasp-top-10.md).

Esta skill **valida e relata**. Não implemente correções até o usuário pedir. Não escreva exploits, payloads, PoCs, scripts de ataque nem passos de reprodução ofensiva — nem para localhost, lab, CTF ou “teste autorizado”.

## Fluxo

1. Identificar o stack (linguagens, frameworks, front, API, auth, banco, CI, cloud, deps).
2. Inventariar superfícies: rotas, middlewares, auth/sessão, validação de entrada, crypto, configs, logs, erros, pipeline, `package.json`/`requirements.txt`/equivalentes.
3. Percorrer as **10 categorias 2025** com o checklist em [owasp-top-10.md](owasp-top-10.md).
4. Para cada categoria: **Alinhado**, **Divergente** ou **Não observável** (com o que faltou inspecionar).
5. Entregar o relatório no formato abaixo. Não omita categoria. Se a entrega for o arquivo em `.docs`, use a skill [generating-owasp-report](../generating-owasp-report/SKILL.md): pasta `.docs/owasp-validating/` e nome `YYYY-MM-DD-validacao-owasp-top-10.md`.

Priorize evidência no repositório. Não invente vulnerabilidade. Se o risco é hipotético, marque **Hipotese** e diga o que confirmaria.

## Achado (obrigatório quando houver divergência)

Para cada divergência:

- **Onde**: arquivo, símbolo e linhas (`caminho:início-fim`); endpoint/componente.
- **O que diverge**: comportamento observado vs controle esperado pelo OWASP.
- **Por que importa**: impacto em confidencialidade, integridade ou disponibilidade — sem receita de ataque.
- **Como mitigar e corrigir**: controle concreto (padrão do framework, lib, header, teste, processo) + cheat sheet / ASVS.
- **Severidade**: `Crítica` | `Alta` | `Média` | `Baixa` | `Informativa`.

Cite código com o formato de citação do Cursor (`start:end:path`).

## Relatório

```markdown
# Validação OWASP Top 10:2025

**Escopo:** [módulos/apps analisados]
**Stack:** [tecnologias]
**Limitações:** [o que não deu para verificar: runtime, cloud, segredos, tráfego]

## Resumo
- Divergências: N (Crítica x / Alta y / …)
- Categorias alinhadas: …
- Não observável: …

## Achados

### A0X:2025 — [nome]
**Status:** Divergente | Alinhado | Não observável
**Severidade:** … (só se Divergente)

**Onde:** `arquivo:linhas` — [endpoint/componente]

**Divergência:** …
**Mitigação e correção:**
1. …
2. …
**Referências:** cheat sheet / ASVS / página OWASP da categoria

(repita; se alinhado, 1–2 linhas de evidência; se não observável, o que falta)

## Prioridade de correção
1. … (Crítica/Alta primeiro)
```

## Regras

- Analise as 10 categorias; SSRF entra em **A01** (2025), não como item isolado.
- Segredos encontrados: **não reproduza o valor**. Indique arquivo/chave e peça rotação.
- Não sugira “testar explorando” com payloads. Sugira testes **defensivos** (autorização positiva/negativa, validação rejeitando entrada inválida, headers, SCA).
- Mitigações devem ser acionáveis no stack do projeto (ex.: guard do Nest/Spring, parameterized queries do ORM, helmet, CSRF do framework).
- Se o usuário pedir correção depois do relatório, corrija só o que foi pedido e revalide as categorias afetadas.
