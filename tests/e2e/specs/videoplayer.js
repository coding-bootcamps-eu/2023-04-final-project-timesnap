// https://docs.cypress.io/api/table-of-contents
/// <reference types="cypress" />

describe("Video Details", () => {
  it("Video jumps to selected time stamp", () => {
    cy.visit("/videos/fd80beb3");
    cy.get('[data-cy="jump-to-timestamp"][data-timestamp="15"]').click();
    cy.get("video").its("currentTime").should("eq", 15);
  });
});
