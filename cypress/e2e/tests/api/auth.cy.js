/// <reference types="cypress" />
let sid;
it("Log in", () => {
  cy.request("POST", "/api/auth/signin", {
    email: Cypress.env("MAIN_USER_EMAIL"),
    password: Cypress.env("MAIN_USER_PASSWORD"),
  }).then((res) => {
    expect(res.status).to.eq(200);
    sid = JSON.stringify(res.headers["set-cookie"]).split(";")[0].split("=")[1];
  });
});
