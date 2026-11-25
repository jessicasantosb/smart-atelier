# Checklist OWASP Top 10:2025

Use esta referência ao inspecionar o código. Para cada categoria: o que procurar, onde costuma aparecer, o que usar para mitigar. Páginas oficiais: [Top 10:2025](https://owasp.org/Top10/2025/).

Cheat sheets: [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/). ASVS: [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).

## A01:2025 Broken Access Control

Inclui IDOR/BOLA, escalação vertical, CORS excessivo, CSRF, **SSRF** (antes A10:2021), metadados/arquivos em web root.

**Procurar:** rotas sem guard/authorize; checagem só no front; ID de recurso sem ownership; role vinda do client (`isAdmin`, header); CORS `*`; falta de CSRF em cookie session; fetch/proxy de URL controlada pelo usuário; listing de diretório; `.git` em público.

**Onde:** controllers, middlewares, gates/policies, GraphQL resolvers, object storage, webhooks, funções de “preview URL”/PDF/imagem.

**Mitigar:** deny-by-default no servidor; autorização central reutilizável; ownership no domínio; CSRF nativo do framework; CORS mínimo; invalidar sessão no logout; JWT curto + refresh/revogação; rate limit; testes de authz horizontal e vertical.

- [Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- ASVS V4 Access Control; V12 API

## A02:2025 Security Misconfiguration

**Procurar:** debug/stack trace em produção; contas default; features de sample; headers de segurança ausentes; cookies sem `Secure`/`HttpOnly`/`SameSite`; XML com XXE; permissões amplas em cloud/storage; secrets em `.env` commitado; CORS/CSP frouxos.

**Onde:** `web.config`, `application.yml`, `nginx`/`Dockerfile`, `next.config`, Spring/ASP.NET, CSP, IaC, consoles admin.

**Mitigar:** hardening repetível (dev/qa/prod iguais, credenciais diferentes); plataforma mínima; security headers; interceptar erros verbosos; federação/credencial de curta duração; verificação automatizada de config.

- [Security Headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [XXE](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)
- [Docker](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- ASVS V13 Configuration; V14 Data Protection

## A03:2025 Software Supply Chain Failures

Expande “componentes vulneráveis” (A06:2021): deps transitivas, CI/CD, registros, IDEs.

**Procurar:** lockfile ausente; deps pinadas em `latest`; packages de fonte não oficial; scripts `postinstall` suspeitos; CI com secrets amplos e sem revisão; imagens base desatualizadas; falta de SCA/SBOM.

**Onde:** `package-lock.json`, `pom.xml`, `requirements.txt`, `go.mod`, workflows CI, Dockerfiles, registries.

**Mitigar:** SBOM (CycloneDX); SCA contínuo (Dependency-Check, Dependency-Track, OSV/GitHub Advisories); só fontes oficiais e pacotes assinados; reduzir deps; MFA e least privilege no git/CI; promover artefatos imutáveis; não rebuild distinto por ambiente.

- [Vulnerable Dependency Management](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html)
- [OWASP Dependency-Track](https://owasp.org/www-project-dependency-track/)
- ASVS V15 Secure Coding and Architecture

## A04:2025 Cryptographic Failures

**Procurar:** HTTP sem TLS; senha em MD5/SHA1/Base64; AES-ECB; IV/nonce fixo; secrets em código; PII em log/URL; JWT `alg=none` / HS256 com chave fraca; random não criptográfico.

**Onde:** login, tokens, campos sensíveis, storage, cookies, integrações.

**Mitigar:** TLS em trânsito; algoritmos modernos (Argon2/bcrypt/scrypt para senha; AES-GCM/ChaCha20-Poly1305); chaves em KMS/HSM; nunca inventar crypto; minimizar dados sensíveis.

- [Cryptographic Storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Transport Layer Protection](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
- ASVS V6 Cryptography

## A05:2025 Injection

Inclui SQLi, command, LDAP, template, **XSS**.

**Procurar:** SQL/HQL concatenado; `eval`, `innerHTML` com dado de usuário; shell com input; ORMs com raw query; NoSQL com objeto não filtrado; SSTI (`{{`, `${`).

**Onde:** repositórios, search, uploads de nome de arquivo, views, emails HTML, jobs.

**Mitigar:** queries parametrizadas/ORM; allowlist; encode de output no contexto (HTML/attr/JS/URL); CSP; nunca shell com input; validar no servidor.

- [Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)
- [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- ASVS V5 Validation/Sanitization/Encoding

## A06:2025 Insecure Design

Falha de **modelo de ameaça**, não só bug de implementação.

**Procurar:** fluxos de negócio sem limites (transferência, desconto, reset); confiança no client para preço/role; falta de rate limit em fluxos abusáveis; multi-tenant sem isolamento; “security through obscurity”.

**Onde:** regras de domínio, checkout, convites, APIs públicas, workflows.

**Mitigar:** threat modeling; requisitos ASVS; least privilege no desenho; limites de negócio no servidor; defense in depth; revisão de desenho antes de feature nova.

- [Threat Modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- OWASP Proactive Controls
- ASVS V1 Architecture / Threat Modeling

## A07:2025 Authentication Failures

**Procurar:** senha fraca; sem MFA em contas privilegiadas; recuperação de senha previsível; session fixation; user enumeration; brute force sem lockout/backoff; “remember me” eterno; credencial em GET.

**Onde:** login, SSO, reset, session store, JWT, OAuth callbacks.

**Mitigar:** framework de identidade maduro (IdP/OAuth/OIDC); MFA; mensagens genéricas; rate limit + lockout; sessão rotacionada pós-login; cookies seguros; NIST 800-63B para política de senha.

- [Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Forgot Password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- ASVS V2 Authentication; V3 Session

## A08:2025 Software or Data Integrity Failures

Confiança e integridade **abaixo** da supply chain (A03): updates, desserialização, CI unsigned, auto-update.

**Procurar:** `unserialize`/`pickle`/`BinaryFormatter` de dado externo; webhook sem assinatura; update de plugin sem checksum; pipeline que publica sem review; Integrity do CDN ausente (`SRI`).

**Onde:** deserializers, webhooks, auto-update, artifact publish, `script src` CDN.

**Mitigar:** não desserializar objeto não confiável (JSON + schema); HMAC/assinatura em webhooks; SRI; builds assinados; imutabilidade de artefato; review obrigatório antes de promote.

- [Deserialization](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html)
- [CI/CD Security](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html)
- [Subresource Integrity](https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html)

## A09:2025 Security Logging & Alerting Failures

Ênfase em **alerta**, não só log.

**Procurar:** login/authz/falhas sem log; logs com senha/token; sem correlação de request-id; sem retenção; dashboards sem alerta; horário dessincronizado.

**Onde:** auth handlers, audit trail, APM, SIEM, exception middleware.

**Mitigar:** logar autenticação, acesso negado, mudanças de permissão e erros de integridade; dados suficientes para investigar sem PII/segredo; alertas para padrões (força bruta, pico de 403); relógio NTP; testes de que o alerta dispara.

- [Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Error Handling](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ASVS V7 Error Handling and Logging

## A10:2025 Mishandling of Exceptional Conditions

Categoria nova. Fail-open, erro que vaza interno, transação parcial, catch vazio, NPE não tratado, falta de timeout/quota.

**Procurar:** `catch` vazio ou que ignora authz; stack trace na API; fail-open em circuit breaker/auth; transação sem rollback; sem timeout em HTTP/DB; upload sem limite; 500 genérico vs 500 com SQL.

**Onde:** exception filters, retries, jobs, pagamentos, parsers, integrações.

**Mitigar:** fail-closed; catch no ponto da falha + handler global; rollback de transação; mensagem genérica ao usuário e detalhe só no log; quotas, timeouts, rate limit; não vazar CWE-209.

- [Error Handling](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ASVS V16.5 Error Handling; MASVS Resilience (se mobile)

## Mapa 2021 → 2025

Use só se o usuário pedir 2021 ou docs antigos do repo.

| 2021 | 2025 |
|------|------|
| A01 Broken Access Control | A01 (inclui SSRF) |
| A02 Cryptographic Failures | A04 |
| A03 Injection | A05 |
| A04 Insecure Design | A06 |
| A05 Security Misconfiguration | A02 |
| A06 Vulnerable and Outdated Components | A03 (escopo maior: supply chain) |
| A07 Identification and Authentication Failures | A07 Authentication Failures |
| A08 Software and Data Integrity Failures | A08 |
| A09 Logging and Monitoring Failures | A09 Logging & Alerting |
| A10 SSRF | absorvido em A01 |
| — | A10 Mishandling of Exceptional Conditions (novo) |
