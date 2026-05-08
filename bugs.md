# Bugs e comportamentos observados

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
Alta

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

## Observação 3 — Sidebar permanece expandida após segundo clique

### Descrição
Após expandir o menu lateral, um novo clique no botão da sidebar não recolhe o menu.

### Comportamento observado
- Primeiro clique expande opções de navegação
- Cliques subsequentes mantêm menu expandido

### Impacto
Possível inconsistência de usabilidade caso a intenção da interface seja permitir expansão e recolhimento do menu lateral.

## Bug 6 — Rotas inválidas retornam erro cru de infraestrutura

### Severidade
Média

### Descrição
Ao acessar uma rota inexistente, a aplicação não apresenta uma página de erro amigável ou redirecionamento adequado.

Em vez disso, o sistema retorna uma mensagem XML de infraestrutura:

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

