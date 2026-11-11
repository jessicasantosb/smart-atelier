# Smart Atelier — instruções para agentes

## Contexto e fontes

Smart Atelier é uma aplicação de artesanato para aprendizado e portfólio: vitrine, lojas, vendas e encomendas. Leia [docs/decisions.md](docs/decisions.md) antes de propor funcionalidades. As decisões D01–D16 estão confirmadas; propostas, pesquisas e tarefas de planejamento não autorizam implementação de novas funcionalidades.

A stack definida para o repositório é Rust no backend e Svelte no frontend. `frontend/` contém o template Svelte 5 + TypeScript + Vite 8, sem SvelteKit. `backend/` contém um binário Rust edição 2024, sem dependências ou servidor, com estrutura equivalente ao init. `database/` permanece reservado. Framework HTTP, banco, provedor financeiro e ferramentas de IA continuam por definir. Consulte `docs/architecture.md` para o estado técnico inicial. `docs/database.md` ainda não existe.

Consulte também a [plano de conteúdos de IA](docs/ia-study-plan.md): 11 áreas técnicas em Svelte/Rust; carreira excluída. Preserve IDs MC e separe aplicação no projeto, laboratório e teoria. Evidência esperada não equivale a entrega concluída; a matriz não autoriza execução de todos os experimentos ou custos.

## Regras obrigatórias

- Leia e aplique os documentos em [docs/rules/](docs/rules/README.md): projeto, Rust e Svelte. Este arquivo é o ponto de entrada; mantenha detalhes nas regras correspondentes.
- Preserve alterações locais e limite edições ao pedido. Não reverta trabalho existente nem atualize dependências sem necessidade.
- Organize por funcionalidade, mantendo frontend e backend alinhados. Rotas traduzem entrada e saída; casos de uso concentram regras de negócio; persistência e integrações ficam atrás de interfaces explícitas.
- Use `UnitOfWork`/`UnitOfService` para persistência e serviços compartilhados quando essas abstrações estiverem definidas. Não crie camadas vazias apenas para cumprir nomenclatura.
- Mantenha chamadas de API nos repositórios da funcionalidade e comportamento reutilizável de dados/estado em módulos próprios. Divida interfaces extensas em componentes com responsabilidade clara.
- Mantenha segredos no servidor. Novos textos de interface devem ter traduções em português e inglês.
- Não transforme sugestões de IA, benchmarks ou funcionalidades de plataformas de referência em requisitos aprovados. Registre mudanças de decisão e evidências de conclusão.

## Proteção de integrações

- Preserve a regra de pagamento integral após aceite do orçamento e antes da produção (D11), e repasse após entrega (D12). Provedor, prazo de repasse, comprovação de entrega e disputas ainda estão em aberto.
- Preserve a proteção preexistente para ERP/Oracle: antes de alterar comportamento, contratos, persistência, tentativas, estados ou sincronização de eventual integração, explique a alteração e seu impacto, peça confirmação e aguarde antes de implementar.
- Antes de alterar orçamento ou pedido de compra compartilhado com essa integração, confira consumidores e payloads; peça confirmação se houver impacto possível. Esta proteção não significa que ERP/Oracle faça parte do escopo aprovado do Smart Atelier.

## Validação e entrega

O bootstrap está criado; não há funcionalidades de produto. Preserve o template até haver uma tarefa de implementação. Não invente scripts ou declare testes aprovados sem execução.

Em `backend/`, Cargo ainda precisa gerar o primeiro `Cargo.lock` via `cargo check`; versione o lockfile. Depois execute as verificações adequadas: `cargo fmt --check`, `cargo check --locked`, `cargo test --locked` (preferindo o alvo afetado) e `cargo clippy --all-targets --locked -- -D warnings`. Use `--all-features` apenas se as funcionalidades forem compatíveis entre si e com o ambiente.

Em `frontend/`, use npm: `npm ci`, `npm run check` e `npm run build`. Desenvolvimento: `npm run dev`; prévia do build: `npm run preview`. Não há scripts de lint ou testes automatizados configurados. Consulte os requisitos no README. Cargo não está instalado no ambiente usado para o bootstrap; não declare o backend validado sem executar as verificações.

Para documentação, verifique links locais, consistência dos IDs e distinção entre decisões, propostas e tarefas. Ao concluir, descreva alterações, verificações e limitações; informe testes não executados e dependências de banco ou serviços externos.

