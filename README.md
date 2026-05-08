# Desafio Analista de Testes - Colmeia

Suíte de testes automatizados E2E para validar a aplicação Colmeia em ambiente QA, utilizando **Cypress**.

> ⚡ **Comece rapidamente** com [QUICK_START.md](./QUICK_START.md)

## 📋 Visão Geral

Este projeto contém testes automatizados para avaliar a funcionalidade e confiabilidade da aplicação Colmeia, incluindo:

- ✅ Fluxo de autenticação (Login)
- ✅ Navegação no Dashboard
- ✅ Gerenciamento de Bancos de Dados
- ✅ Funcionalidades da página Colmeia Forms
- ✅ Controle de acesso

## 🔍 Ambiente Testado

| Item | Valor |
|------|-------|
| **Ambiente** | QA |
| **URL** | https://teste-colmeia-qa.colmeia-corp.com/ |
| **Navegador** | Google Chrome |
| **Ferramenta** | Cypress |
| **Tipo de Teste** | E2E (End-to-End) |

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── login.cy.js              # Testes de autenticação
│   ├── dashboard.cy.js          # Testes do dashboard
│   ├── bancoDeDados.cy.js       # Testes de gerenciamento de bancos de dados
│   └── colmeiaForms.cy.js       # Testes da página Colmeia Forms
├── fixtures/
│   └── example.json             # Dados para testes
└── support/
    ├── commands.js              # Comandos customizados
    └── e2e.js                   # Configurações de suporte
├── cypress.config.js            # Configuração do Cypress
├── package.json                 # Dependências do projeto
└── bugs.md                       # Documentação de bugs encontrados
```

## 🐛 Bugs e Observações Encontrados

### Bugs de Severidade Crítica

- **Bug 4 - Acesso sem autenticação**: Dashboard acessível diretamente sem login

### Bugs de Severidade Alta

- **Bug 6 e 7 - Persistência de dados**: Itens criados não persistem após refresh da página

### Bugs de Severidade Média

- **Bug 1 - Mensagem de erro confusa**: Login bem-sucedido exibe erro antes de redirecionar
- **Bug 5 - Erro cru de infraestrutura**: Rotas inválidas retornam XML em vez de página 404 amigável
- **Bug 8 - Arquivamento não funciona**: Itens não são movidos para lista de arquivados

### Bugs de Severidade Baixa

- **Bug 2 - Botão inativo**: "Esqueceu sua senha?" não executa ação
- **Bug 3 - Menu de perfil não funciona**: Botão "Candidato" no header não abre menu

### Observações Importantes

- **Observação 1**: Modal de erro pode ser fechada clicando fora, mas não com ESC
- **Observação 2**: Modal bloqueia interação com formulário (comportamento consistente)
- **Observação 3**: Sidebar não recolhe após segundo clique
- **Observação 4**: Falta de `data-cy` e `data-testid` nos elementos (fragilidade dos testes)
- **Observação 5**: Página Colmeia Forms sem funcionalidades implementadas

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

```bash
npm install
```

### Executar Testes

#### Modo interativo (Cypress Test Runner)
```bash
npm run cypress:open
```

#### Modo headless (CI/CD)
```bash
npm run cypress:run
```

#### Executar arquivo específico
```bash
npm run cypress:run -- --spec "cypress/e2e/login.cy.js"
```

#### Executar em navegador específico
```bash
npm run cypress:run -- --browser chrome
npm run cypress:run -- --browser firefox
```

## 📦 Dependências

- **cypress**: ^13.0.0 - Framework de testes E2E
- **cypress-plugin-tab**: Plugin para navegação via teclado

## 🧪 Suites de Teste

### 1. Login (`login.cy.js`)

Validação do fluxo de autenticação:
- ✅ Exibição de erro com credenciais corretas
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Comportamento do modal de erro
- ✅ Botão "Esqueceu sua senha?" (inativo)

**Total de testes**: 11 (1 com `.skip`)

### 2. Dashboard (`dashboard.cy.js`)

Funcionalidades principais do dashboard:
- ✅ Acesso após login
- ✅ Exibição de logo e perfil
- ✅ Menu lateral e navegação
- ✅ Persistência de autenticação
- ✅ Responsividade mobile
- ✅ Navegação via teclado

**Total de testes**: 16 (1 com `.skip`)

### 3. Bancos de Dados (`bancoDeDados.cy.js`)

Gerenciamento de bancos de dados:
- ✅ Criação de novos itens
- ✅ Exclusão de itens
- ✅ Pesquisa e filtro
- ✅ Arquivamento (com bugs)
- ✅ Validação de campos obrigatórios
- ✅ Exibição de tabela

**Total de testes**: 28 (2 com `.skip`)

### 4. Colmeia Forms (`colmeiaForms.cy.js`)

Validação da página Colmeia Forms:
- ✅ Acesso à página
- ✅ Manutenção de rota
- ✅ Navegação do menu
- ✅ Ausência de erro ou funcionalidade

**Total de testes**: 10 (1 com `.skip`)

## ⚠️ Testes com `.skip`

Os seguintes testes foram marcados como `.skip` por corresponderem a bugs conhecidos:

| Arquivo | Teste | Motivo |
|---------|-------|--------|
| `bancoDeDados.cy.js` | "deve manter banco após refresh" | Bug 6 - Dados não persistem |
| `bancoDeDados.cy.js` | "deve mover item para lista de arquivados" | Bug 8 - Arquivamento não funciona |
| `bancoDeDados.cy.js` | "não deveria permitir acesso direto sem login" | Bug 4 - Controle de acesso falho |
| `colmeiaForms.cy.js` | "não deveria permitir acesso direto sem login" | Bug 4 - Controle de acesso falho |
| `dashboard.cy.js` | "não deveria permitir acesso ao dashboard sem autenticação" | Bug 4 - Controle de acesso falho |
| `login.cy.js` | Todos os testes executáveis | Comportamentos esperados validados |

## 🔐 Controle de Acesso

**Importante**: Testes de controle de acesso estão marcados como `.skip` devido ao **Bug 4**, que permite acesso direto ao dashboard sem autenticação.

### Credenciais de Teste

```
Email: qa@test.com
Senha: 123456
```

## 📝 Comandos Customizados

### `cy.login()`

Realiza login automaticamente com as credenciais padrão.

```javascript
cy.login();
```

## 🎯 Objetivos Alcançados

- ✅ Documentação completa dos bugs encontrados
- ✅ Cobertura de testes para funcionalidades principais
- ✅ Identificação de falhas de segurança (controle de acesso)
- ✅ Validação de fluxos de navegação
- ✅ Testes de responsividade
- ✅ Testes de validação de formulários

## 📌 Observações Finais

1. **Fragilidade dos testes**: A ausência de `data-cy` e `data-testid` torna os testes frágeis. Recomenda-se adicionar esses atributos aos componentes interativos.

2. **Bugs críticos**: O acesso ao dashboard sem autenticação representa uma falha séria de segurança.

3. **Persistência de dados**: A falta de persistência de dados criados compromete a funcionalidade central da aplicação.

4. **Experiência do usuário**: Mensagens de erro confusas e botões inativos causam confusão ao usuário.

## � Recursos Adicionais
- [QUICK_START.md](./QUICK_START.md) - Comece em 5 minutos ⚡- [SETUP.md](./SETUP.md) - Guia completo de instalação e configuração
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [SELECTORS.md](./SELECTORS.md) - Melhores práticas de seletores
- [bugs.md](./bugs.md) - Documentação detalhada de bugs encontrados
