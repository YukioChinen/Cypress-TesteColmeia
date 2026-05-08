describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://teste-colmeia-qa.colmeia-corp.com/");
  });

  it("deve exibir erro mesmo utilizando as credenciais fornecidas", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("123456");

    cy.get("button").contains("Entrar").click();

    cy.contains("Seu login está incorreto").should("be.visible");

    cy.contains("Continuar").click();
  });

  it("deve exibir campo obrigatório ao tentar fazer login com credenciais vazias", () => {
    cy.contains("Entrar").click();

    cy.contains("Usuário ou senha inválidos").should("be.visible");
  });

  it("deve exibir erro ao utilizar email inválido", () => {
    cy.get("#email").type("teste");

    cy.get("#password").type("123456");

    cy.contains("Entrar").click();

    cy.contains("Usuário ou senha inválidos").should("be.visible");
  });

  it("deve exibir erro ao utilizar senha inválida", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("teste");

    cy.contains("Entrar").click();

    cy.contains("Usuário ou senha inválidos").should("be.visible");
  });

  it("campo email deve ser do tipo email", () => {
    cy.get("#email").should("have.attr", "type", "email");
  });

  it("deve fechar popup ao clicar fora da modal", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("123456");

    cy.contains("Entrar").click();

    cy.contains("Seu login está incorreto").should("be.visible");

    cy.get("body").click(0, 0);

    cy.contains("Seu login está incorreto").should("not.exist");
  });

  it("não deve fechar popup ao pressionar ESC", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("123456");

    cy.contains("Entrar").click();

    cy.contains("Seu login está incorreto").should("be.visible");

    cy.get("body").type("{esc}");

    cy.contains("Seu login está incorreto").should("be.visible");
  });

  it("não deve permitir interação com os campos enquanto popup estiver aberto", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("123456");

    cy.contains("Entrar").click();

    cy.contains("Seu login está incorreto").should("be.visible");

    cy.get("#email").click({ force: true });

    cy.get("#email").should("have.value", "qa@test.com");
  });

  it("não deve enviar login infinitamente ao pressionar Enter várias vezes", () => {
    cy.get("#email").type("qa@test.com");

    cy.get("#password").type("123456{enter}{enter}{enter}{enter}");

    cy.contains("Seu login está incorreto").should("be.visible");
  });

  it('não realiza nenhuma ação ao clicar em "Esqueceu sua senha?"', () => {
    cy.url().then((urlAntes) => {
      cy.contains("Esqueceu sua senha?").click();

      cy.url().should("eq", urlAntes);

      cy.contains("Recuperar senha").should("not.exist");
    });
  });
});
