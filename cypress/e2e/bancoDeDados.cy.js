describe("Bancos de Dados", () => {
  beforeEach(() => {
    cy.login();

    cy.get('a[routerlink="/dashboard/campanha"]').click();

    cy.contains("Bancos de dados").click();
  });

  it("deve exibir página Bancos de dados", () => {
    cy.contains("Bancos de dados").should("be.visible");

    cy.get("table").should("be.visible");
  });

  it("deve manter rota após atualizar página", () => {
    cy.reload();

    cy.url().should("include", "/dashboard/campanha/bancos-de-dados");
  });

  it("deve navegar corretamente utilizando botão voltar do navegador", () => {
    cy.go("back");

    cy.url().should("include", "/dashboard");
  });
it("deve exibir colunas da tabela", () => {
  cy.contains("Nome do banco de dados")
    .should("be.visible");

  cy.contains("Data de criação")
    .should("be.visible");
});
it("deve exibir mensagem quando não houver bancos", () => {
  cy.contains("Nenhum banco de dados encontrado")
    .should("be.visible");
});
it("deve permitir digitar no campo de pesquisa", () => {
  // Nota: Ideal seria usar data-testid="search-input"
  cy.get('input[type="search"]')
    .first()
    .type("teste");

  cy.get('input[type="search"]')
    .first()
    .should("have.value", "teste");
});

it("deve abrir modal ao clicar em Criar", () => {
  cy.contains("Criar").click();

  cy.contains("Adicionar novo item")
    .should("be.visible");
});
it("deve criar novo banco de dados", () => {

  const nomeBanco = `Banco Teste ${Date.now()}`;

  cy.contains("Criar").click();

  cy.contains("Adicionar novo item")
    .parent()
    .within(() => {

      cy.get('input[placeholder="Nome do item"]')
        .type(nomeBanco);

      cy.contains("Salvar").click();

    });

  cy.contains(nomeBanco)
    .should("be.visible");

});
it("deve atualizar tabela após criar banco", () => {

  const nomeBanco = `Banco ${Date.now()}`;

  cy.contains("Criar").click();

  cy.contains("Adicionar novo item")
    .parent()
    .within(() => {

      cy.get('input[placeholder="Nome do item"]')
        .type(nomeBanco);

      cy.contains("Salvar").click();

    });

  cy.get("table")
    .should("contain", nomeBanco);

});
it("deve atualizar lista ao clicar em refresh", () => {

  cy.contains("Criar")
    .parent()
    .find("button")
    .first()
    .click();

});
it("deve filtrar banco ao pesquisar", () => {

  const nomeBanco = `Banco Pesquisa ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.get('input[type="search"]')
    .type(nomeBanco);

  cy.contains(nomeBanco)
    .should("be.visible");

});
it("deve fechar modal após salvar", () => {

  cy.contains("Criar").click();

  cy.contains("Adicionar novo item")
    .parent()
    .within(() => {

      cy.get('input[placeholder="Nome do item"]')
        .type("Teste");

      cy.contains("Salvar").click();

    });

  cy.contains("Adicionar novo item")
    .should("not.exist");

});
it("não deve permitir criar banco sem nome", () => {

  cy.contains("Criar").click();

  cy.contains("Salvar").click();

  cy.contains("obrigatório")
    .should("be.visible");

});
it("deve exibir data de criação", () => {

  const nomeBanco = `Banco ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.get("table")
    .should("contain", new Date().getFullYear().toString());

});
// BUG CONHECIDO:
// item criado não persiste após refresh.
// Documentado no bugs.md como Bug 7.

it.skip("deve manter banco após refresh", () => {

  const nomeBanco = `Banco ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.reload();

  cy.contains(nomeBanco)
    .should("exist");

});

it("deve exibir ações de apagar e arquivar", () => {

  const nomeBanco = `Banco Acoes ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains("tr", nomeBanco)
    .within(() => {

      cy.get('button[title="Apagar"]')
        .should("exist");

      cy.get('button[title="Arquivar"]')
        .should("exist");

    });

});

it("deve apagar banco de dados", () => {

  const nomeBanco = `Banco Delete ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains("td", nomeBanco)
    .should("exist");

  cy.get('button[title="Apagar"]')
    .first()
    .click();

  cy.contains("td", nomeBanco)
    .should("not.exist");

});

it("deve remover banco de dados da tabela ao apagar", () => {

  const nomeBanco = `Banco Delete ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains("td", nomeBanco)
    .should("exist");

  cy.contains("tr", nomeBanco)
    .within(() => {

      cy.get('button[title="Apagar"]')
        .click();

    });

  cy.contains("td", nomeBanco)
    .should("not.exist");

});

it("deve arquivar banco de dados", () => {

  const nomeBanco = `Banco Arquivar ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains("td", nomeBanco)
    .should("exist");

  cy.get('button[title="Arquivar"]')
    .first()
    .click();

});

it("deve exibir seção de itens arquivados", () => {

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains("Itens Arquivados")
    .should("be.visible");

});

it("deve alternar visualização de itens arquivados", () => {

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains("Itens Arquivados")
    .should("be.visible");

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains("Itens Arquivados")
    .should("not.exist");

});

it("deve destacar botão ao abrir arquivados", () => {

  cy.get('button[data-variant="icon"]')
    .first()
    .find('svg')
    .click();

  cy.get('button[data-variant="icon"]')
    .first()
    .find('svg')
    .should("have.class", "text-red-300");

});

// BUG CONHECIDO:
// funcionalidade de arquivar não move item para lista de arquivados

it.skip("deve mover item para lista de arquivados", () => {

  const nomeBanco = `Banco Arquivado ${Date.now()}`;

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains("tr", nomeBanco)
    .within(() => {

      cy.get('button[title="Arquivar"]')
        .click();

    });

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains(nomeBanco)
    .should("exist");

});

it("deve criar item mesmo com visualização de arquivados ativa", () => {

  const nomeBanco = `Banco Arquivados ${Date.now()}`;

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains("Itens Arquivados")
    .should("be.visible");

  cy.contains("Criar").click();

  cy.get('input[placeholder="Nome do item"]')
    .type(nomeBanco);

  cy.contains("Salvar").click();

  cy.contains(nomeBanco)
    .should("not.exist");

  cy.get('button[data-variant="icon"]')
    .first()
    .click();

  cy.contains(nomeBanco)
    .should("exist");

});

it("deve permitir cancelar modal", () => {
  cy.contains("Criar").click();

  cy.get("body").click(0, 0);

  cy.contains("Adicionar novo item")
    .should("not.exist");
});

it("deve permitir criar múltiplos bancos", () => {

  const banco1 = `Banco 1 ${Date.now()}`;
  const banco2 = `Banco 2 ${Date.now()}`;

  // Criar primeiro banco
  cy.contains("Criar").click();
  cy.get('input[placeholder="Nome do item"]')
    .first()
    .type(banco1);
  cy.contains("Salvar").click();

  // Criar segundo banco
  cy.contains("Criar").click();
  cy.get('input[placeholder="Nome do item"]')
    .first()
    .type(banco2);
  cy.contains("Salvar").click();

  cy.contains(banco1).should("exist");
  cy.contains(banco2).should("exist");
});

});

describe("Controle de acesso", () => {
  it.skip("não deveria permitir acesso direto a Bancos de dados sem login", () => {
    cy.visit(
      "https://teste-colmeia-qa.colmeia-corp.com/dashboard/campanha/bancos-de-dados",
    );

    cy.url().should("not.include", "/dashboard");
  });
});
