/// <reference types="cypress" />

describe("Initial a11y tests on logged out pages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("A11y checks on the Categories homepage", () => {
    cy.findByRole("link", { name: /categories/i }).click();
    cy.injectAxe();
    cy.checkA11y(
      {},
      {
        rules: {
          "heading-order": { enabled: false },
        },
      }
    );
  });

  it("A11y checks on the Users homepage", () => {
    cy.findByRole("link", { name: /users/i }).click();
    cy.injectAxe();
    cy.checkA11y();
  });

  it("A11y checks on the Authenticate homepage", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.injectAxe();
    cy.checkA11y();
  });
});
