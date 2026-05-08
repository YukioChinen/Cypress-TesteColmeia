# Bugs e comportamentos observados

## Ambiente testado

- Ambiente QA
- Navegador: Google Chrome
- Tipo de teste: Manual + Automação E2E
- Ferramenta de automação: Cypress

---

## Bug 1 — Mensagem de erro exibida mesmo com autenticação bem-sucedida

### Severidade
Média

### Descrição
Ao realizar login utilizando as credenciais fornecidas para acesso ao sistema, a aplicação exibe a mensagem:

"Seu login está incorreto"

Entretanto, ao clicar em "Continuar", o usuário é redirecionado normalmente para o dashboard, indicando que a autenticação foi concluída com sucesso.

### Passos para reproduzir
1. Acessar a tela de login
2. Inserir:
   - Email: qa@test.com
   - Senha: 123456
3. Clicar em "Entrar"
4. Observar mensagem de erro exibida
5. Clicar em "Continuar"

### Resultado esperado
O sistema deve autenticar o usuário e redirecioná-lo ao dashboard sem exibir mensagem de erro.

### Resultado obtido
O sistema exibe a mensagem:
"Seu login está incorreto"

Porém, após clicar em "Continuar", o usuário é redirecionado normalmente para o dashboard.

### Impacto
O comportamento pode causar confusão ao usuário, já que o sistema informa falha de autenticação mesmo permitindo acesso à área autenticada.

---

## Bug 2 — Botão "Esqueceu sua senha?" não executa nenhuma ação

### Severidade
Baixa

### Descrição
O botão/link "Esqueceu sua senha?" está visível na tela de login, porém não realiza nenhuma ação ao ser clicado.

### Passos para reproduzir
1. Acessar a tela de login
2. Clicar em "Esqueceu sua senha?"

### Resultado esperado
O sistema deveria:
- redirecionar para fluxo de recuperação de senha
ou
- abrir modal/formulário de recuperação

### Resultado obtido
Nenhuma ação é executada após o clique.

### Impacto
Usuários que esqueceram a senha não conseguem iniciar o processo de recuperação de acesso.

---

## Observação 1 — Modal pode ser fechado clicando fora da área

### Descrição
O modal de erro pode ser fechado ao clicar fora da área da modal.

### Comportamento observado
- Clique fora da modal fecha o popup
- Pressionar ESC não fecha o popup

### Impacto
O comportamento inconsistente pode gerar confusão na experiência do usuário.

---

## Observação 2 — Modal bloqueia interação com o formulário

### Descrição
Enquanto o popup de erro está aberto, o usuário não consegue interagir com os campos de login.

### Resultado
Comportamento consistente com bloqueio de foco da interface.

---

## Bug 3 — Botão de perfil do usuário não executa nenhuma ação

### Severidade
Baixa

### Descrição
O botão de perfil identificado como "Candidato" aparenta ser interativo, porém não executa nenhuma ação ao ser clicado.

### Passos para reproduzir
1. Realizar login na aplicação
2. Acessar o dashboard
3. Clicar no botão "Candidato" localizado no header

### Resultado esperado
O sistema deveria:
- abrir menu do usuário
ou
- exibir opções de perfil/logout/configurações

### Resultado obtido
Nenhuma ação é executada após o clique.

### Impacto
O usuário não possui acesso visível a ações relacionadas à conta ou sessão.

---

## Bug 4 — Dashboard pode ser acessado sem autenticação

### Severidade
Crítica

### Descrição
A rota do dashboard pode ser acessada diretamente sem necessidade de autenticação.

### Passos para reproduzir
1. Acessar:
   `/dashboard`
2. Sem realizar login previamente

### Resultado esperado
Usuário não autenticado deveria:
- ser redirecionado para tela de login
ou
- receber bloqueio de acesso

### Resultado obtido
O sistema permite acesso direto ao dashboard sem autenticação.

### Impacto
Falha de controle de acesso, permitindo que usuários não autenticados visualizem áreas internas da aplicação.

---

## Observação 3 — Sidebar permanece expandida após segundo clique

### Descrição
Após expandir o menu lateral, um novo clique no botão da sidebar não recolhe o menu.

### Comportamento observado
- Primeiro clique expande opções de navegação
- Cliques subsequentes mantêm menu expandido

### Impacto
Possível inconsistência de usabilidade caso a intenção da interface seja permitir expansão e recolhimento do menu lateral.

---

## Bug 5 — Rotas inválidas retornam erro cru de infraestrutura

### Severidade
Média

### Descrição
Ao acessar uma rota inexistente, a aplicação não apresenta uma página de erro amigável ou redirecionamento adequado.

Em vez disso, o sistema retorna uma mensagem XML de infraestrutura, indicando ausência de tratamento frontend para rotas inválidas:

```xml
<Error>
  <Code>NoSuchKey</Code>
  <Message>The specified key does not exist.</Message>
</Error>
```
### Passos para reproduzir
1. Acessar uma rota inexistente, por exemplo:
   `/rota-invalida`

### Resultado esperado
O sistema deveria:
- exibir página 404 amigável
ou
- redirecionar para página inicial/login

### Resultado obtido
A aplicação retorna mensagem XML de erro de infraestrutura.

### Impacto
Má experiência do usuário e exposição de detalhes técnicos da infraestrutura da aplicação.

---

## Observação 4 — Ausência de identificadores dedicados para automação de testes

### Descrição
Os elementos interativos da interface (botões, inputs e links) não possuem identificadores dedicados para automação, como atributos:

- `data-cy`
- `data-testid`
- `id`

Em diversos casos, os testes automatizados precisam utilizar seletores frágeis baseados em:
- posição de elementos
- hierarquia DOM
- classes utilitárias
- texto exibido

### Comportamento observado
Exemplos encontrados:
- múltiplos botões sem identificadores únicos
- múltiplos inputs na mesma tela
- ações acessíveis apenas via estrutura DOM
- necessidade de utilização de seletores como:
  - `button:first`
  - `.parent().find()`
  - `input[placeholder="..."]`

### Resultado esperado
Os componentes interativos deveriam possuir identificadores estáveis para automação, por exemplo:

```html
<button data-cy="refresh-button">
<input data-cy="search-input">
```

### Impacto
- Maior fragilidade dos testes automatizados
- Maior custo de manutenção da suíte de testes
- Possibilidade de falsos positivos/negativos após alterações visuais
- Dificuldade para escalabilidade da automação E2E

---

## Bug 6 — Dados criados não persistem após atualização da página

### Severidade
Alta

### Descrição
Os itens criados na tela "Bancos de dados" não permanecem disponíveis após atualizar a página.

O comportamento indica possível ausência de persistência dos dados no backend ou falha no recarregamento da listagem após refresh.

### Passos para reproduzir
1. Acessar:
   `/dashboard/campanha/bancos-de-dados`
2. Clicar em "Criar"
3. Inserir um nome válido para o banco de dados
4. Clicar em "Salvar"
5. Confirmar que o item aparece na tabela
6. Atualizar a página (`F5` ou reload do navegador)

### Resultado esperado
O item criado deveria permanecer listado após atualização da página.

### Resultado obtido
O item desaparece após o refresh da aplicação.

### Impacto
- Possível perda de dados criados pelo usuário
- Indício de ausência de persistência backend
- Inconsistência entre estado da interface e armazenamento da aplicação
- Comprometimento da confiabilidade do sistema

---

## Bug 7 — Dados criados não persistem após atualização da página

### Severidade
Alta

### Descrição
Os itens criados na tela "Bancos de dados" não permanecem disponíveis após atualizar a página.

O comportamento indica possível ausência de persistência dos dados no backend ou falha no recarregamento da listagem após refresh.

### Passos para reproduzir
1. Acessar:
   `/dashboard/campanha/bancos-de-dados`
2. Clicar em "Criar"
3. Inserir um nome válido para o banco de dados
4. Clicar em "Salvar"
5. Confirmar que o item aparece na tabela
6. Atualizar a página (`F5` ou reload do navegador)

### Resultado esperado
O item criado deveria permanecer listado após atualização da página.

### Resultado obtido
O item desaparece após o refresh da aplicação.

### Impacto
- Possível perda de dados criados pelo usuário
- Indício de ausência de persistência backend
- Inconsistência entre estado da interface e armazenamento da aplicação
- Comprometimento da confiabilidade do sistema

---

## Bug 8 — Função de arquivar não move item para lista de arquivados

### Severidade
Média

### Descrição
Ao clicar no botão "Arquivar" de um banco de dados criado, o item não é movido para a área de itens arquivados.

### Passos para reproduzir
1. Acessar "Bancos de dados"
2. Criar novo item
3. Clicar no botão "Arquivar"
4. Abrir seção "Itens Arquivados"

### Resultado esperado
O item deveria:
- desaparecer da tabela principal
e
- aparecer na seção "Itens Arquivados"

### Resultado obtido
O item permanece na listagem principal e não aparece na seção de arquivados.

### Impacto
A funcionalidade de arquivamento não pode ser utilizada corretamente pelos usuários.

---

## Observação 5 — Página Colmeia Forms sem funcionalidades implementadas

### Descrição
A página "Colmeia Forms" pode ser acessada normalmente pelo menu da campanha, porém atualmente não apresenta nenhuma funcionalidade visível ao usuário.

### Comportamento observado
- Página renderiza corretamente
- Não existem:
  - formulários
  - tabelas
  - botões de ação
  - mensagens orientativas
  - conteúdo funcional

### Impacto
Usuário consegue acessar a área, porém não possui nenhuma funcionalidade disponível, gerando sensação de funcionalidade incompleta ou não implementada.