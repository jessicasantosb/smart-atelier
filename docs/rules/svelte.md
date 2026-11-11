# Svelte — frontend

Frontend inicializado com Svelte 5, TypeScript e Vite 8, sem SvelteKit. Consulte package.json e package-lock.json para versões. A tela original do gerador foi preservada; a regra de traduções aplica-se aos novos textos de produto.

## Organização e estado

- Organize por funcionalidade, com componentes focados, repositórios para chamadas HTTP e módulos reutilizáveis para dados/estado. Evite componentes que concentrem tela, persistência e regras de negócio.
- Prefira TypeScript na configuração inicial, com props e contratos tipados. Trate respostas externas como dados a validar; tipos estáticos não validam JSON recebido.
- Mantenha estado próximo de quem o utiliza; compartilhe apenas o necessário. Evite estado global mutável para dados privados, especialmente entre requisições se houver renderização no servidor.
- No Svelte 5, use `$state` para estado reativo, `$derived` para valores calculados e `$effect` para efeitos externos. Evite efeitos apenas para copiar ou sincronizar valores que podem ser derivados.
- Respeite ownership das props; comunique alterações por contratos explícitos. Remova listeners, timers e assinaturas ao encerrar seu uso.
- Em listas com identidade, use chaves estáveis. Evite requisições duplicadas e resultados antigos sobrescrevendo consultas mais recentes.

## Experiência e segurança

- Modele carregamento, vazio, sucesso e erro; forneça retorno em ações assíncronas e previna envios duplicados.
- Use HTML semântico, labels, navegação por teclado e foco visível. Trate mensagens de erro e atualização de forma acessível; não silencie avisos de acessibilidade sem justificativa.
- Mantenha layout responsivo e reutilize padrões visuais existentes. Novos textos devem ter tradução em português e inglês, incluindo erros, rótulos e textos alternativos.
- Validação no cliente ajuda o usuário; regras de negócio, permissões e pagamentos continuam sob validação do backend.
- Não exponha segredos no bundle ou configuração pública. Evite `{@html}` com conteúdo não confiável; quando indispensável, use uma estratégia de sanitização apropriada.
- Se houver SSR, isole acesso a APIs do navegador e dados por requisição. Recursos específicos de SvelteKit só se aplicam após sua adoção.

## Verificação

- Use scripts reais do package.json e o gerenciador indicado pelo lockfile; não introduza ferramentas redundantes.
- Verifique tipos, acessibilidade e comportamento das jornadas afetadas. Teste estados de falha e permissões relevantes, preferindo interações observáveis a detalhes internos.
- Use testes ponta a ponta para jornadas críticas quando existirem. Não apresente build aprovado como comprovação de todas as regras de negócio.

Referências oficiais: [estado derivado](https://svelte.dev/docs/svelte/$derived), [efeitos](https://svelte.dev/docs/svelte/$effect) e [boas práticas](https://github.com/sveltejs/svelte/blob/main/documentation/docs/07-misc/01-best-practices.md). Consulte a documentação correspondente à versão escolhida.
