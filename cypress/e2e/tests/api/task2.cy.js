/// <reference types="cypress" />
import HomePage from "../../../pom/pages/HomePage";
import SignUpForm from "../../../pom/forms/SignUpForm";
import urls from "../../../test-data/urls.json";
import GaragePage from "../../../pom/pages/GaragePage";
import SignInForm from "../../../pom/forms/SignInForm";

let sid;

describe("Garage page view", () => {
  before(() => {
    cy.request("POST", "/api/auth/signin", {
      email: Cypress.env("MAIN_USER_EMAIL"),
      password: Cypress.env("MAIN_USER_PASSWORD"),
    }).then((res) => {
      expect(res.status).to.eq(200);
      sid = JSON.stringify(res.headers["set-cookie"])
        .split(";")[0]
        .split("=")[1];
    });
  });

  after(() => {
    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: {
        Cookie: `sid=${sid}`,
      },
    }).then(({ body }) => {
      body.data.forEach((car) => {
        cy.request({
          method: "DELETE",
          url: `/api/cars/${car.id}`,
          headers: {
            Cookie: `sid=${sid}`,
          },
        });
      });
    });
  });

  it("Fill in options and submit form", () => {
    GaragePage.openGaragePage();
    cy.url().should("eq", urls.garagePage);
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
});
