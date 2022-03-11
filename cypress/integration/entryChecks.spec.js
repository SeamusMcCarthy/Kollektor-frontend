/// <reference types="cypress" />

describe("Test entry interaction", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");
  });

  it("Check Guitar category for entries", () => {
    cy.findByRole("link", { name: /categories/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.get("main a").first().invoke("attr", "href").should("contain", "entry");
  });

  it.only("Test login - valid details", () => {
    cy.findByRole("link", { name: /authenticate/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type("seamus24@test.com");
    cy.findByLabelText("Password").type("testtest");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type("Line 6 Helix");
    cy.findByRole("textbox", { name: /description/i }).type(
      "Powered by next-generation HXTM Modeling technology, the Helix family recreates amps, cabs, mics, and effects with accuracy and precision. Vintage and modern tube amp models give an authentic sound and feel, and are designed to interact with your playing like the originals."
    );
    cy.findByRole("textbox", { name: /address/i }).type("Limerick, Ireland");
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile("/images/site/Micro_amp.jpg", {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.scrollTo("bottom");
    cy.findAllByRole("link", { name: /line 6 helix/i }).last();
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
});
