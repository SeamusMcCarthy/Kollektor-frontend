/// <reference types="cypress" />

describe("Test site interaction", () => {
  const data = require("../credentials.json");

  beforeEach(() => {
    cy.visit("/");
  });

  it("Confirms we are on the homepage", () => {
    cy.findByRole("link", { name: /categories/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
  });

  it("Test login - invalid details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.invalidUser);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("heading", { name: /an error occurred!/i }).should("exist");
  });

  it("Test login - valid details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("button", { name: /logout/i }).should("exist");
  });

  it("Test signup - valid details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    const idNum = Math.floor(Math.random() * 100000);
    cy.findByRole("textbox", { name: /name/i }).type(data.testTitle + idNum);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.findByRole("textbox", { name: /email/i }).type(
      "test_" + idNum + "@test.com"
    );
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /sign up/i }).click();
    cy.findByRole("button", { name: /logout/i }).should("exist");
  });

  it("Test signup - incomplete details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    const idNum = Math.floor(Math.random() * 100000);
    cy.findByRole("textbox", { name: /name/i }).type(data.testTitle + idNum);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.findByRole("textbox", { name: /email/i }).type(
      "test_" + idNum + "@test.com"
    );

    cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /sign up/i }).should("be.disabled");
  });

  it("Test switching from login to signup and back", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("heading", { name: /login required/i });
    cy.findByRole("button", { name: /pick image/i }).should("not.exist");
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    cy.findByRole("button", { name: /pick image/i }).should("be.visible");
    cy.findByRole("button", { name: /switch to log in/i }).click();
    cy.findByRole("button", { name: /pick image/i }).should("not.exist");
  });
});
