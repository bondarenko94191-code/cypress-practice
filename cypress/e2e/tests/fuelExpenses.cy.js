/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";
import urls from "../../test-data/urls.json";
import GaragePage from "../../pom/pages/GaragePage";
import FuelExpensesPage from "../../pom/pages/FuelExpensesPage";

describe("Fuel expenses form", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    cy.url().should("include", "/panel/garage");
  });
  it("Fuel expenses form view", () => {
    GaragePage.addCarToGarage("BMW", "3", "88");
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.vehicleDropDown.should("be.visible");
    FuelExpensesPage.dateCalendar.should("be.visible");
    FuelExpensesPage.mileageInput.should("be.visible");
    FuelExpensesPage.numberOfLitersInput.should("be.visible");
    FuelExpensesPage.totalCost.should("be.visible");
    FuelExpensesPage.closeFormButton.click();
  });
  it("Fuel expenses buttons", () => {
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.addAnExpensesModal.should("be.visible");
    FuelExpensesPage.closeFormButton.click();
    FuelExpensesPage.addAnExpensesModal.should("be.not.visible");
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.cancelButton.click();
    FuelExpensesPage.addAnExpensesModal.should("be.not.visible");
  });
  it("Check the dropdown menu on the fuel page", () => {
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.selectCar("Audi TT");
  });
});

describe("Add fuel expenses", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    cy.url().should("include", "/panel/garage");
  });
  it("Check ability to Add fuel expenses", () => {
    cy.url().should("include", "/panel/garage");
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    const today = new Date().toLocaleDateString("uk-UA");

    FuelExpensesPage.addExpenses(2, today, "400", "90", "1999");
    FuelExpensesPage.expensesTable.should("be.visible");
  });
  it("Check empty form behaviour", () => {
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.removeExpenses();
    cy.get("tbody tr").should("have.length", 0);
    FuelExpensesPage.emptyStatePage.should(
      "have.text",
      "You don’t have any fuel expenses filed in",
    );
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.addButton.should("be.disabled");
  });
});

describe("Error messages", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
  });
  it("Check the Error message if set date is in future", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const futureDate = tomorrow.toLocaleDateString("uk-UA");
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.vehicleDropDown.select(1);
    FuelExpensesPage.dateCalendar.clear().type(futureDate);
    FuelExpensesPage.mileageInput.clear().type("99");
    FuelExpensesPage.numberOfLitersInput.clear().type("100");
    FuelExpensesPage.totalCost.type("1000");
    FuelExpensesPage.addButton.click();
    FuelExpensesPage.errorDate
      .should("be.visible")
      .and("include.text", "Report date has to be less than tomorrow");
  });
  it("Check the Error message if set date is in past", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const date = yesterday.toLocaleDateString("uk-UA");
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.addFuelExpensesButton.click();
    FuelExpensesPage.vehicleDropDown.select(1);
    FuelExpensesPage.dateCalendar.clear().type(date);
    FuelExpensesPage.mileageInput.clear().type("99");
    FuelExpensesPage.numberOfLitersInput.clear().type("100");
    FuelExpensesPage.totalCost.type("1000");
    FuelExpensesPage.addButton.click();
    FuelExpensesPage.errorDate
      .should("be.visible")
      .and(
        "include.text",
        "New expense date must not be less than car creation date.",
      );
  });

  it("Check the validation error messages on Number of liters field", () => {
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.triggerErrorForLiters();
    FuelExpensesPage.validationMessageLiters.should("be.visible");
  });
  it("Check the validation error messages on Total cost field", () => {
    FuelExpensesPage.openFuelExpensesPage();
    cy.url().should("eq", urls.fuelExpensesPage);
    FuelExpensesPage.triggerErrorForCost();
    FuelExpensesPage.validationMessageCost.should("be.visible");
  });
});
