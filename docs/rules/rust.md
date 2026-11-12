# Rust — backend

Backend inicializado como binário Rust edição 2024 (requer Rust 1.85+), sem dependências. Runtime, framework e crates permanecem por definir; estas regras não instalam dependências. A estrutura foi criada manualmente por ausência de Cargo no ambiente de bootstrap; gere e versione Cargo.lock ao validar com uma toolchain Rust. Siga o [AGENTS.md](../../AGENTS.md): código, identificadores, comentários, testes e exemplos de configuração devem estar em inglês.

## Tipos e ownership

- Prefira empréstimos (`&T`, `&str`, `&[T]`) quando a operação não precisar adquirir o valor. Transfira ownership quando necessário; use `clone` com motivo concreto.
- Use `struct`, `enum` e novos tipos para representar invariantes e estados relevantes. Evite booleanos ambíguos e strings livres para estados fechados.
- Mantenha visibilidade mínima; exponha somente a interface necessária. Use traits para variação ou isolamento real de dependências, sem criar uma trait para cada struct.
- Use iteradores para transformações legíveis e loops para controle de fluxo claro. Evite coleções intermediárias e otimização sem medição.

## Erros e execução

- Retorne `Result` em operações falíveis e propague com `?`, preservando contexto. Use `Option` para ausência esperada.
- Não use `unwrap`, `expect`, `panic!`, `todo!` ou `unimplemented!` em fluxos de produção; trate entradas inválidas e falhas externas explicitamente.
- Prefira erros tipados no domínio e casos de uso; `thiserror` pode ajudar se adotado. Reserve erros genéricos como `anyhow` para composição da aplicação, sem perder categorias necessárias ao contrato.
- Traduza erros para HTTP na camada de transporte; não exponha detalhes de banco ou credenciais ao cliente.
- Em código assíncrono, evite I/O bloqueante e locks mantidos durante `await`. Escolha mecanismos compatíveis com o runtime adotado.
- Explicite limites transacionais e não mantenha transações abertas durante chamadas externas demoradas. Defina recuperação antes de coordenar persistência e efeitos externos.
- Evite `unsafe`; se indispensável, documente invariantes de segurança e como são verificadas.

## Qualidade

- Execute formatação, compilação, testes direcionados e Clippy conforme o AGENTS.md. Não atualize o lockfile apenas para contornar uma falha de `--locked`.
- Corrija avisos; exceções de lint exigem justificativa local e compatibilidade com a versão do compilador. Não suprima avisos globalmente para esconder problemas.
- Escreva testes nomeados pelo comportamento e cenário, cobrindo regras, erros e transições. Use asserções suficientes para comprovar o resultado; não imponha uma única asserção artificialmente.
- Use testes de integração para contratos e persistência; não dependa de provedores reais para testes unitários. Informe requisitos de banco e testes não executados.
- Documente interfaces públicas, erros e invariantes com rustdoc. Comentários explicam razões; TODOs apontam para tarefa rastreável.
- Meça desempenho antes de otimizar e execute benchmarks em release quando necessários.

Base: skill local `rust-best-practices`, especialmente capítulos 1, 2, 4, 5 e 8; [Rust Book — erros recuperáveis](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html).
