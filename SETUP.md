# Guia de Configuração - Colmeia QA Tests

## 📋 Pré-requisitos

- **Node.js**: v14.0.0 ou superior
- **npm**: v6.0.0 ou superior (instalado com Node.js)
- **Git**: para controle de versão
- **Google Chrome**: navegador padrão para testes

## 🚀 Instalação Rápida

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/colmeia-qa-tests.git
cd colmeia-qa-tests
```

### 2. Instalar Dependências

```bash
npm install
```

Isso irá instalar:
- Cypress v15.14.2
- cypress-plugin-tab v2.0.0
- dotenv v16.3.1

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações (opcional)
# Por padrão, as credenciais são:
# CYPRESS_USER_EMAIL=qa@test.com
# CYPRESS_USER_PASSWORD=123456
```

## 🧪 Executando os Testes

### Modo Interativo (Cypress UI)

```bash
npm run cypress:open
```

Abre a interface gráfica do Cypress onde você pode:
- Visualizar os testes em tempo real
- Debugar problemas
- Executar testes individuais
- Ver detalhes de falhas

### Modo Headless (Terminal)

```bash
npm test
```

Executa todos os testes sem interface gráfica.

### Executar Testes Específicos

```bash
# Apenas testes de login
npm run test:login

# Apenas testes do dashboard
npm run test:dashboard

# Apenas testes de bancos de dados
npm run test:bancos

# Apenas testes de Colmeia Forms
npm run test:forms
```

### Executar com Navegadores Específicos

```bash
# Com Chrome
npm run test:chrome

# Com Firefox
npm run test:firefox

# Com Edge
npm run test:edge
```

### Modo Headed (com interface visual)

```bash
npm run cypress:run:headed
```

## 📊 Relatórios

### Screenshots

Capturas de tela são geradas automaticamente:
- **Sucesso**: Gerada apenas se `videoUploadOnPasses` estiver ativo
- **Falha**: Sempre gerado em `cypress/screenshots/`

### Vídeos

Os vídeos de execução são salvos em:
```
cypress/videos/
```

Desabilite vídeos editando `cypress.config.js`:
```javascript
video: false
```

## 🔧 Configurações Avançadas

### Alterar URL Base

Edite `.env`:
```bash
CYPRESS_BASE_URL=https://sua-url.com
```

Ou execute:
```bash
CYPRESS_BASE_URL=https://sua-url.com npm test
```

### Alterar Timeouts

Em `cypress.config.js`:
```javascript
e2e: {
  defaultCommandTimeout: 10000,    // 10 segundos
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
}
```

### Desabilitar Clear de LocalStorage

Em `cypress/support/e2e.js`, comente:
```javascript
// beforeEach(() => {
//   cy.window().then((win) => {
//     win.localStorage.clear()
//   })
// })
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `CYPRESS_BASE_URL` | URL base da aplicação | https://teste-colmeia-qa.colmeia-corp.com |
| `CYPRESS_USER_EMAIL` | Email para login | qa@test.com |
| `CYPRESS_USER_PASSWORD` | Senha para login | 123456 |
| `NODE_ENV` | Ambiente | test |

## 🐛 Troubleshooting

### "Command not found: cypress"

**Solução**: Instale as dependências:
```bash
npm install
```

### Testes timeout

**Solução**: Aumente o timeout em `cypress.config.js`:
```javascript
defaultCommandTimeout: 20000  // 20 segundos
```

### Erro: "Cannot find module 'dotenv'"

**Solução**: Instale as dependências:
```bash
npm install
```

### Elementos não encontrados

**Possíveis causas**:
- Aplicação não carregou completamente
- Seletor inválido
- Elemento não está no viewport

**Solução**:
```javascript
// Aguardar elemento
cy.get('element', { timeout: 20000 }).should('exist')

// Scroll para elemento
cy.get('element').scrollIntoView()
```

### Erro de autenticação

**Solução**: Verifique as credenciais em `.env`:
```bash
CYPRESS_USER_EMAIL=qa@test.com
CYPRESS_USER_PASSWORD=123456
```

## 📚 Estrutura de Diretórios

```
cypress/
├── e2e/                    # Testes E2E
│   ├── login.cy.js
│   ├── dashboard.cy.js
│   ├── bancoDeDados.cy.js
│   └── colmeiaForms.cy.js
├── fixtures/               # Dados para testes
│   └── example.json
├── support/                # Suporte e comandos
│   ├── commands.js        # Comandos customizados
│   └── e2e.js            # Configurações globais
├── screenshots/            # Screenshots de falhas
├── videos/                 # Vídeos de testes
└── downloads/              # Downloads durante testes
```

## 🔐 Segurança

**Importante**: Nunca commite `.env` com credenciais reais:

```bash
# Adicione ao .gitignore
.env
.env.local
cypress/videos
cypress/screenshots
```

## 📞 Próximos Passos

1. Leia [README.md](./README.md) para visão geral do projeto
2. Leia [CONTRIBUTING.md](./CONTRIBUTING.md) para contribuir
3. Consulte [bugs.md](./bugs.md) para bugs conhecidos
4. Execute `npm run cypress:open` para explorar os testes

## 💡 Dicas

- Use `cy.debug()` para pausar execução
- Use `cy.pause()` para pausar antes de próximo comando
- Verifique o console do Cypress para logs detalhados
- Use `cy.window()` para acessar o objeto window da aplicação

---

**Última atualização**: Maio/2026
