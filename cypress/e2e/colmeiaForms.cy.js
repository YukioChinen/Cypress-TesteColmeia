describe("Colmeia Forms", () => {

  beforeEach(() => {
    cy.login();

    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Colmeia Forms").click();
  });

  it("deve exibir página Colmeia Forms", () => {

    cy.contains("Colmeia Forms")
      .should("be.visible");

  });

  it("deve manter rota correta", () => {

    cy.url()
      .should("include", "/dashboard/campanha/colmeia-forms");

  });

  it("deve manter rota após reload", () => {

    cy.reload();

    cy.url()
      .should("include", "/dashboard/campanha/colmeia-forms");

  });

  it("deve navegar corretamente utilizando botão voltar", () => {

    cy.go("back");

    cy.url()
      .should("include", "/dashboard");

  });

  it("deve exibir menu lateral da campanha", () => {

    cy.contains("Bancos de dados")
      .should("be.visible");

    cy.contains("Colmeia Forms")
      .should("be.visible");

  });

  it("deve destacar item ativo no menu", () => {

    cy.contains("Colmeia Forms")
      .parent()
      .should("have.class", "bg-primary");

  });

  it("não deve exibir tabela ou formulário", () => {

    cy.get("table")
      .should("not.exist");

    cy.get("form")
      .should("not.exist");

  });

  it("não deve exibir mensagem de erro na tela", () => {

    cy.contains("Error")
      .should("not.exist");

    cy.contains("404")
      .should("not.exist");

  });

});


describe("Controle de acesso", () => {
  it.skip("não deveria permitir acesso direto a Colmeia Forms sem login", () => {
    cy.visit(
      "https://teste-colmeia-qa.colmeia-corp.com/dashboard/campanha/colmeia-forms",
    );

    cy.url().should("not.include", "/dashboard");
  });
});
