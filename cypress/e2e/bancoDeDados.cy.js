describe('Bancos de Dados', () => {

  beforeEach(() => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com/')

    cy.get('#email')
      .type('qa@test.com')

    cy.get('#password')
      .type('123456')

    cy.contains('Entrar')
      .click()

    cy.contains('Continuar')
      .click()

    cy.get('aside a')
      .click()

    cy.contains('Bancos de dados')
      .click()

  })

  it('deve acessar página de Bancos de dados', () => {

    cy.url()
      .should('include', '/dashboard/campanha/bancos-de-dados')

  })

  it('deve manter rota após atualizar página', () => {

    cy.reload()

    cy.url()
      .should('include', '/dashboard/campanha/bancos-de-dados')

  })

  it('deve navegar corretamente utilizando botão voltar do navegador', () => {

  cy.go('back')

  cy.url()
    .should('include', '/dashboard')

})

})

describe("Controle de acesso", () => {
  it('não deveria permitir acesso direto a Bancos de dados sem login', () => {

  cy.visit('https://teste-colmeia-qa.colmeia-corp.com/dashboard/campanha/bancos-de-dados')

  cy.url()
    .should('not.include', '/dashboard')

})
});