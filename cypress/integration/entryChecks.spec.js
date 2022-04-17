/// <reference types="cypress" />

describe("Test entry interaction", () => {
  const data = require("../credentials.json");

  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");
  });

  it("Check Guitar category for entries", () => {
    cy.findByRole("link", { name: /categories/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.get("main a").first().invoke("attr", "href").should("contain", "entry");
  });

  it("Create entry - valid details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(data.title);
    cy.findByRole("textbox", { name: /description/i }).type(data.description);
    cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.scrollTo("bottom", { ensureScrollable: false });
    cy.findAllByText(data.title).last().should("be.visible");
    cy.findByRole("searchbox").type(data.title);
    cy.findAllByText(data.title).last().should("be.visible");
  });

  it("Delete entry", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /my entries/i }).click();
    cy.findAllByText(data.title).last().click();
    cy.findByRole("heading", { name: /line 6 helix/i });
    cy.findByRole("button", { name: /delete/i }).click();
    cy.findAllByRole("button", { name: /delete/i })
      .first()
      .click();
    cy.wait(2000);
    cy.findByRole("link", { name: /my entries/i }).click();
    cy.findByRole("heading", { name: /search/i }).should("be.visible");
    cy.contains(data.title).should("not.exist");
  });

  it("Create entry - invalid location", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(data.title);
    cy.findByRole("textbox", { name: /description/i }).type(data.description);
    cy.findByRole("textbox", { name: /address/i }).type(data.invalidLocation);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).click();
    cy.findByRole("heading", { name: /an error occurred!/i }).should("exist");
  });

  it("Create entry - incomplete details", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(data.title);
    cy.findByRole("textbox", { name: /description/i }).type(data.description);
    // cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).should("be.disabled");
  });

  it("Create, check map, edit & delete entry", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(data.title);
    cy.findByRole("textbox", { name: /description/i }).type(data.description);
    cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.scrollTo("bottom", { ensureScrollable: false });
    cy.findAllByText(data.title).last().should("be.visible");
    cy.findAllByText(data.title).last().click();
    cy.findByRole("button", { name: /view on map/i }).click();

    cy.findByRole("button", { name: /close/i }).click();
    cy.findByRole("link", { name: /edit/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(" edited");
    cy.findByRole("button", { name: /update/i }).click();
    cy.wait(2000);
    cy.findByRole("link", { name: /my entries/i }).click();
    cy.findAllByText(data.title + " edited")
      .last()
      .click();
    cy.findByRole("heading", { name: /line 6 helix edited/i });
    cy.findByRole("button", { name: /delete/i }).click();
    cy.findAllByRole("button", { name: /delete/i })
      .first()
      .click();
    cy.wait(2000);
    cy.findByRole("link", { name: /categories/i });
    cy.findByRole("link", { name: /my entries/i }).click();
    cy.findByRole("heading", { name: /search/i }).should("be.visible");
    cy.contains(data.title + " edited").should("not.exist");
  });

  it("Create entry, add comment/reply & delete entry", () => {
    cy.findByRole("link", { name: /log in/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(data.email);
    cy.findByLabelText("Password").type(data.password);
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByRole("link", { name: /new entry/i }).click();
    cy.findByRole("textbox", { name: /title/i }).type(data.title);
    cy.findByRole("textbox", { name: /description/i }).type(data.description);
    cy.findByRole("textbox", { name: /address/i }).type(data.location);
    cy.findByRole("button", { name: /pick image/i }).click();
    cy.get("input[type=file]").selectFile(data.image, {
      force: true,
    });
    cy.get("select").select(1);
    cy.findByRole("button", { name: /add entry/i }).click();
    cy.findByRole("heading", { level: 2, name: /guitar/i }).click();
    cy.scrollTo("bottom", { ensureScrollable: false });
    cy.findAllByText(data.title).last().should("be.visible");
    cy.findAllByText(data.title).last().click();
    cy.scrollTo("bottom");
    cy.findByRole("button", { name: /show more/i }).click();

    cy.findByRole("textbox").type(data.comment);
    cy.findByRole("button", { name: /write/i }).click();
    cy.findByText("Reply").click();
    cy.findAllByRole("textbox").last().type(data.reply);
    cy.findByRole("button", { name: /reply/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();
    cy.findAllByRole("button", { name: /delete/i })
      .first()
      .click();
    cy.wait(2000);
    cy.findByRole("link", { name: /my entries/i }).click();
    cy.findByRole("heading", { name: /search/i }).should("be.visible");
    cy.contains(data.title + " edited").should("not.exist");
  });
});
