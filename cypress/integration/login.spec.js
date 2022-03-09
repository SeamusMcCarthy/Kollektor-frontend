/// <reference types="cypress" />

describe("Test site interaction", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Confirms we are on the homepage", () => {
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
    cy.findByRole("textbox", { name: /email/i }).type("seamus24@test.com");
    cy.findByLabelText("Password").type("testtest");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("button", { name: /logout/i }).should("exist");
  });

  it("Test signup - valid details", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    const idNum = Math.floor(Math.random() * 100000);
    cy.findByRole("textbox", { name: /name/i }).type("Test Account " + idNum);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile("/images/site/Micro_amp.jpg", {
      force: true,
    });
    cy.findByRole("textbox", { name: /email/i }).type(
      "test_" + idNum + "@test.com"
    );
    cy.findByLabelText("Password").type("testtest");
    cy.findByRole("textbox", { name: /address/i }).type("Limerick, Ireland");
    cy.findByRole("button", { name: /sign up/i }).click();
    cy.findByRole("button", { name: /logout/i }).should("exist");
  });

  it("Test signup - incomplete details", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    const idNum = Math.floor(Math.random() * 100000);
    cy.findByRole("textbox", { name: /name/i }).type("Test Account " + idNum);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile("/images/site/Micro_amp.jpg", {
      force: true,
    });
    cy.findByRole("textbox", { name: /email/i }).type(
      "test_" + idNum + "@test.com"
    );

    cy.findByRole("textbox", { name: /address/i }).type("Limerick, Ireland");
    cy.findByRole("button", { name: /sign up/i }).should("be.disabled");
  });

  it("Test switching from login to signup and back", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("heading", { name: /login required/i });
    cy.findByRole("button", { name: /pick image/i }).should("not.exist");
    cy.findByRole("button", { name: /switch to sign up/i }).click();
    cy.findByRole("button", { name: /pick image/i }).should("be.visible");
    cy.findByRole("button", { name: /switch to log in/i }).click();
    cy.findByRole("button", { name: /pick image/i }).should("not.exist");
  });
});
