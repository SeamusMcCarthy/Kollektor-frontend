/// <reference types="cypress" />

describe("Initial connectivity trial", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.skip("Confirms we are on the homepage", () => {
    // cy.injectAxe();
    // cy.checkA11y();
    cy.findByRole("link", { name: /categories/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
  });

  it("Test login - invalid details", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type("invalid@email.com");
    cy.findByLabelText("Password").type("invalid");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("heading", { name: /an error occurred!/i }).should("exist");
  });

  it("Test login - valid details", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type("test_dummy10@test.com");
    cy.findByLabelText("Password").type("testtest");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("button", { name: /logout/i }).should("exist");
  });
});
