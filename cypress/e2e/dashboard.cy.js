describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
  });

  it("deve acessar dashboard após login", () => {
    cy.url().should("include", "/dashboard");
  });

  it("deve exibir logo e nome da aplicação", () => {
    cy.contains("Colmeia").should("be.visible");
  });

  it("deve exibir perfil do usuário", () => {
    // Nota: Ideal seria usar data-testid="profile-button"
    cy.contains("Candidato").should("be.visible");
  });

  it("deve exibir menu lateral", () => {
    cy.get("aside").should("be.visible");
  });

  it("deve navegar ao clicar no menu lateral", () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.url().should("include", "/dashboard/campanha");
  });

  it("não realiza nenhuma ação ao clicar no botão de perfil", () => {
    cy.url().then((urlAntes) => {
      cy.contains("Candidato").click();

      cy.url().should("eq", urlAntes);
    });
  });

  it("não exibe menu ao clicar no botão de perfil", () => {
    cy.contains("Candidato").click();

    cy.get('[data-cy="profile-menu"]').should("not.exist");
  });

  it("deve manter usuário autenticado após refresh", () => {
    cy.reload();

    cy.url().should("include", "/dashboard");
  });

  it("deve manter estrutura em tela mobile", () => {
    cy.viewport("iphone-x");

    cy.contains("Colmeia").should("be.visible");

    cy.get("aside").should("have.css", "display", "flex");
  });

  it("deve exibir opções do menu campanha", () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Bancos de dados").should("be.visible");

    cy.contains("Colmeia Forms").should("be.visible");
  });
  it("deve navegar para Bancos de dados", () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Bancos de dados").click();

    cy.url().should("include", "/dashboard/campanha/bancos-de-dados");
  });
  it("deve navegar para Colmeia Forms", () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Colmeia Forms").click();

    cy.url().should("include", "/dashboard/campanha/colmeia-forms");
  });
  it("deve manter sidebar expandida ao clicar novamente", () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Bancos de dados").should("be.visible");

    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.contains("Bancos de dados").should("be.visible");
  });

  it("deve exibir sidebar em resolução mobile", () => {
    cy.viewport("iphone-x");

    cy.get("aside").should("be.visible");
  });

  it("deve manter comportamento da sidebar após refresh", () => {
    cy.get("aside a").click();

    cy.reload();

    cy.contains("Bancos de dados").should("exist");
  });

  it("deve retornar erro ao acessar rota inválida", () => {
    cy.request({
      url: "https://teste-colmeia-qa.colmeia-corp.com/rota-invalida",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);

      expect(response.body).to.include("NoSuchKey");
    });
  });

  it("deve permitir navegação via teclado", () => {
    cy.get('body').tab();

    cy.focused().should('exist');
  });
});

describe("Controle de acesso", () => {
  it.skip("não deveria permitir acesso ao dashboard sem autenticação", () => {
    cy.visit("https://teste-colmeia-qa.colmeia-corp.com/dashboard");

    cy.url().should("not.include", "/dashboard");
  });
});
