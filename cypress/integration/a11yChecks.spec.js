/// <reference types="cypress" />

describe("Initial a11y tests on logged out pages", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("A11y checks on the Categories homepage", () => {
    cy.findByRole("link", { name: /categories/i }).click();
    cy.findByRole("heading", { name: /guitar/i });
    cy.checkA11y(
      {},
      {
        rules: {
          "heading-order": { enabled: false },
        },
      }
    );
  });

  it("A11y checks on the Users page", () => {
    cy.findByRole("link", { name: /users/i }).click();
    cy.checkA11y(
      {},
      {
        rules: {
          "heading-order": { enabled: false },
        },
      }
    );
  });

  it("A11y checks on the Log In page", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.checkA11y(
      {},
      {
        rules: {
          "heading-order": { enabled: false },
        },
      }
    );
  });
});
