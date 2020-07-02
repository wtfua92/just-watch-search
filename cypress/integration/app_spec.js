describe("JustWatch search", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".search-bar > input").as("input");
  });

  it("should open an app", () => {
    cy.get("#app").should("to.exist");
  });

  it("should display an input field", () => {
    cy.get("@input")
      .type("Ozark")
      .should("have.value", "Ozark");
  });

  it("should display search items", () => {
    cy.get("@input")
      .type("Ozark")
      .then(() => {
        cy.get(".search-result__item").should("have.length.greaterThan", 0);
      });
  });

  it("should display latest search result if input is cleared", () => {
    cy.get("@input").type("Ozark");
    cy.get(".search-result__item").should("have.length.greaterThan", 0);
    cy.get("@input").clear();
    cy.get(".search-result__item").should("have.length.greaterThan", 0);
  });
});
