/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
import urls from "../../test-data/urls.json";
import GaragePage from "../../pom/pages/GaragePage";
import SignInForm from "../../pom/forms/SignInForm";

describe("Garage page view", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
  });
  it("Garage empty page view ", () => {
    GaragePage.openAddCarForm();
    GaragePage.messageOnEmptyPage.should("be.visible");
    GaragePage.addCarsButton.should("be.visible");
    GaragePage.navigationPanel.should("be.visible");
  });
  it("Select brand/model/mileage and close form", () => {
    GaragePage.openAddCarForm();
    GaragePage.addCarModal.should("be.visible");
    GaragePage.selectBrand("BMW");
    GaragePage.selectModel("3");
    GaragePage.enterMileage("15000");
    GaragePage.closeForm();
    cy.url().should("eq", urls.garagePage);
  });
  it("Fill in form and cancel changes", () => {
    GaragePage.openAddCarForm();
    GaragePage.addCarModal.should("be.visible");
    GaragePage.selectBrand("Audi");
    GaragePage.selectModel("TT");
    GaragePage.enterMileage("150");
    GaragePage.cancelChanges();
    cy.url().should("eq", urls.garagePage);
  });
  it("Fill in options and submit form", () => {
    GaragePage.openAddCarForm();
    GaragePage.addCarModal.should("be.visible");
    GaragePage.selectBrand("Ford");
    GaragePage.selectModel("Sierra");
    GaragePage.enterMileage("150");
    GaragePage.addCarButton.should("be.enabled");
    GaragePage.addCarSubmit();
    cy.url().should("eq", urls.garagePage);
    GaragePage.carTile.should("be.visible");
    GaragePage.milesInput.should("be.visible");
    GaragePage.updateMilesButton.should("be.visible");
  });
  it("Update the miles", () => {
    cy.url().should("eq", urls.garagePage);
    GaragePage.milesInput.clear();
    GaragePage.milesInput.type("99");
    GaragePage.updateMilesButton.click();
    GaragePage.milesInput.should("have.value", "99");
  });
  it("Remove car from Garage", () => {
    cy.url().should("eq", urls.garagePage);
    GaragePage.openEditMenu();
    GaragePage.removeCar();
    GaragePage.confirmRemoveCar();
  });
});
