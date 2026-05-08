# Melhores Práticas de Seletores - Colmeia QA Tests

## 📊 Estratégia de Seletores

Para garantir testes robustos e manuteníveis, use a seguinte hierarquia de prioridade:

```
1. data-testid (MELHOR)
2. data-cy
3. id
4. name
5. classes específicas
6. atributos únicos (placeholder, type, etc)
7. contains() ou posição (PIOR - Evite)
```

## ✅ Seletores Recomendados

### Bom: data-testid

```html
<button data-testid="save-button">Salvar</button>
<input data-testid="search-input" type="search" />
```

```javascript
cy.get('[data-testid="save-button"]').click()
cy.get('[data-testid="search-input"]').type("teste")
```

**Benefícios**:
- Explicitamente criado para testes
- Não muda com UI/CSS
- Fácil de manter
- Altamente específico

---

### Bom: data-cy

```html
<button data-cy="create-button">Criar</button>
```

```javascript
cy.get('[data-cy="create-button"]').click()
```

**Benefícios**:
- Alternativa ao data-testid
- Amplamente usado em Cypress
- Claro propósito (cy = cypress)

---

### Aceitável: ID

```html
<input id="email" type="email" />
```

```javascript
cy.get('#email').type("qa@test.com")
```

**Limitações**:
- IDs não devem mudar
- Pode ser usado por CSS/JavaScript

---

### Aceitável: Atributos Únicos

```html
<input placeholder="Nome do item" type="text" />
```

```javascript
cy.get('input[placeholder="Nome do item"]').type("Banco Teste")
```

**Cuidado**: Placeholder pode mudar em futuras versões

---

## ❌ Seletores Frágeis (Evite)

### Ruim: contains()

```javascript
// ❌ Muito frágil
cy.contains("Salvar").click()

// O que acontece se:
// - Texto muda? Falha
// - Componente é traduzido? Falha
// - Há múltiplos "Salvar"? Ambiguidade
```

**Quando usar**:
- Apenas quando absolutamente necessário
- Combine com escopo: `cy.get('form').contains('Salvar')`

### Ruim: Posição

```javascript
// ❌ Muito frágil
cy.get("button:first").click()
cy.get(".parent").find("button").eq(1)

// O que acontece se:
// - Ordem muda? Falha
// - Novo botão é adicionado? Falha
```

### Ruim: Classes de Utilidade

```javascript
// ⚠️ Frágil
cy.get(".btn.btn-primary.rounded.shadow").click()

// Problema: Depende de estrutura CSS
```

---

## 🔧 Padrões Práticos

### ✅ Buscar dentro de escopo

```javascript
// ✅ Bom: Limita busca ao formulário
cy.get('form').within(() => {
  cy.get('[data-testid="name-input"]').type("John")
  cy.get('[data-testid="save-button"]').click()
})

// ❌ Ruim: Busca em toda página
cy.get('[data-testid="name-input"]').type("John")
cy.get('[data-testid="save-button"]').click()
```

### ✅ Usar .first() ou .eq() com cuidado

```javascript
// ✅ Aceitável: Limitado e específico
cy.get('input[type="search"]')
  .first()
  .type("teste")

// ❌ Ruim: Muito genérico
cy.get("input").type("teste")
```

### ✅ Combinar seletores

```javascript
// ✅ Bom: Combina múltiplos atributos
cy.get('button[data-testid="delete"][title="Apagar"]')
  .click()

// ❌ Ruim: Confia em apenas um
cy.contains("Apagar").click()
```

---

## 📝 Exemplos Reais do Projeto

### Banco de Dados - Melhor Prática

**HTML esperado**:
```html
<input data-testid="search-input" type="search" placeholder="Pesquisar" />
```

**Teste**:
```javascript
// ✅ Melhor
cy.get('[data-testid="search-input"]')
  .type("teste")
  .should("have.value", "teste")

// ⚠️ Atual (funciona mas frágil)
cy.get('input[type="search"]')
  .first()
  .type("teste")
```

---

### Criação de Item

**HTML esperado**:
```html
<button data-testid="create-button">Criar</button>
<input data-testid="item-name-input" placeholder="Nome do item" />
```

**Teste**:
```javascript
// ✅ Melhor
const nomeBanco = `Banco ${Date.now()}`
cy.get('[data-testid="create-button"]').click()
cy.get('[data-testid="item-name-input"]').type(nomeBanco)
cy.get('[data-testid="save-button"]').click()

// ⚠️ Atual (funciona mas frágil)
const nomeBanco = `Banco ${Date.now()}`
cy.contains("Criar").click()
cy.get('input[placeholder="Nome do item"]').type(nomeBanco)
cy.contains("Salvar").click()
```

---

### Ações em Tabela

**HTML esperado**:
```html
<table>
  <tr>
    <td>Banco Teste</td>
    <td>
      <button data-testid="delete-button" title="Apagar">
        <i class="icon-trash"></i>
      </button>
      <button data-testid="archive-button" title="Arquivar">
        <i class="icon-archive"></i>
      </button>
    </td>
  </tr>
</table>
```

**Teste**:
```javascript
// ✅ Melhor
cy.contains("tr", "Banco Teste")
  .within(() => {
    cy.get('[data-testid="delete-button"]').click()
  })

// ⚠️ Atual (funciona mas frágil)
cy.get('button[title="Apagar"]')
  .first()
  .click()
```

---

## 🎯 Checklist para Novos Testes

- [ ] Usa `data-testid` para elementos interativos?
- [ ] Evita `contains()` para ações críticas?
- [ ] Usa escopos (`.within()`) para limitar busca?
- [ ] Seletores fazem sentido mesmo após mudanças CSS?
- [ ] Não usa posição/índice como seletor principal?
- [ ] Combina múltiplos atributos quando necessário?
- [ ] Adiciona comentários explicando seletores complexos?

---

## 🔄 Melhorando Testes Existentes

### Passo 1: Identifique Seletores Frágeis

```bash
# Procure por:
grep -r "contains(" cypress/e2e/
grep -r ":first\|:eq\|:last" cypress/e2e/
grep -r "\.click(0, 0)" cypress/e2e/
```

### Passo 2: Documente Mudanças Necessárias

```javascript
// BUG: Seletor frágil
// TODO: Aguardar implementação de data-testid="search-input"
cy.get('input[type="search"]').type("teste")
```

### Passo 3: Trabalhe com Desenvolvedores

**Para frontend developers**:

> Para melhorar a robustez dos testes E2E, adicione `data-testid` aos seguintes elementos:
> - Campo de pesquisa: `data-testid="search-input"`
> - Botão criar: `data-testid="create-button"`
> - Campo nome item: `data-testid="item-name-input"`

---

## 📚 Referências

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Avoiding Anti-Patterns](https://docs.cypress.io/guides/references/anti-patterns)
- [Testing Library Queries](https://testing-library.com/docs/dom-testing-library/queries)

---

**Última atualização**: Maio/2026
