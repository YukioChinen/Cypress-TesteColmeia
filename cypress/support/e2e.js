// ============================================
// Suporte E2E - Configurações Globais
// ============================================

// Importar comandos customizados
import './commands'
import 'cypress-plugin-tab'

// ============================================
// Configurações Globais
// ============================================

// Desabilitar tratamento de exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

// Hook para fazer screenshot em caso de falha
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    cy.screenshot(`failure-${this.currentTest.title}`)
  }
})

// Limpar localStorage antes de cada teste
beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})