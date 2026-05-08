# ⚡ Quick Start - Colmeia QA Tests

Comece em 5 minutos!

## 🚀 Setup Rápido

```bash
# 1. Clonar
git clone https://github.com/seu-usuario/colmeia-qa-tests.git
cd colmeia-qa-tests

# 2. Instalar
npm install

# 3. Executar
npm test
```

## 📺 Abrir Interface Visual

```bash
npm run cypress:open
```

Clique em um arquivo de teste e veja em tempo real!

## 🧪 Executar Testes Específicos

```bash
# Apenas login
npm run test:login

# Apenas dashboard  
npm run test:dashboard

# Apenas bancos de dados
npm run test:bancos

# Apenas Colmeia Forms
npm run test:forms
```

## ⚙️ Configuração Customizada

```bash
# Copiar arquivo de exemplo (opcional)
cp .env.example .env

# Editar .env se necessário
# vim .env
```

## 📊 Ver Resultados

- **Screenshots**: `cypress/screenshots/` (em caso de falha)
- **Vídeos**: `cypress/videos/` (todos os testes)
- **Terminal**: Output direto após `npm test`

## 🆘 Problemas?

| Problema | Solução |
|----------|---------|
| `Command not found: cypress` | `npm install` |
| Testes timeout | Aumentar timeout em `cypress.config.js` |
| Elemento não encontrado | Verificar seletor em `SELECTORS.md` |
| Credenciais incorretas | Verificar `.env` (padrão: qa@test.com / 123456) |

## 📚 Próximas Leituras

1. **Novo aqui?** → Leia [SETUP.md](./SETUP.md)
2. **Quer contribuir?** → Leia [CONTRIBUTING.md](./CONTRIBUTING.md)
3. **Seletores frágeis?** → Leia [SELECTORS.md](./SELECTORS.md)
4. **Bugs encontrados?** → Leia [bugs.md](./bugs.md)

## 💡 Dicas Rápidas

```javascript
// Pausar execução
cy.debug()

// Pausar antes do próximo comando
cy.pause()

// Esperar elemento aparecer
cy.get('button').should('exist')

// Executar função do app
cy.window().then(win => console.log(win))
```

---

**Pronto para começar?** → `npm run cypress:open`
