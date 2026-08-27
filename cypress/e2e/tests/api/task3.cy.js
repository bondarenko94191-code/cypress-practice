/// <reference types="cypress" />
import HomePage from "../../../pom/pages/HomePage";
import SignInForm from "../../../pom/forms/SignInForm";
import FuelExpensesPage from "../../../pom/pages/FuelExpensesPage";

describe("Login", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
  });
  it("Should login with valid credentials", () => {
    cy.intercept("**/profile", (req) => {
      req.continue((res) => {
        res.body.data.name = "Polar";
        res.body.data.lastName = "Bear";
      });
    });
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    cy.url().should("include", "/panel/garage");
    FuelExpensesPage.userProfileDropdown.click();
    cy.contains(".dropdown-item", "Profile").click();
    cy.url().should("include", "/panel/profile");
  });
});
