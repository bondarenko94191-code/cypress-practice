/// <reference types="cypress" />

describe("Find elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Open homepage", () => {
    cy.visit("/");
  });
  it("Find all links", () => {
    cy.get("a");
  });
  it("Find Sign up button", () => {
    cy.contains("button", "Sign up");
  });
  it("Find Facebook link", () => {
    cy.get('a[href="https://www.facebook.com/Hillel.IT.School"]').click();
  });
  it("Find social link>Youtube", () => {
    cy.get(".contacts_socials").children().eq(2).click();
  });
  it("Find Login button on the Login form", () => {
    cy.get(".header_signin").click();
    cy.get("app-signin-modal").within(() => {
      cy.get(".btn-primary");
    });
  });
  it("Sign in form", () => {
    cy.get(".header_signin").click();
    cy.get(".ng-valid").invoke("click");
  });
  it("Text of Guest login button", () => {
    cy.get(".-guest").invoke("text").should("eq", "Guest log in");
  });
  it("Fill in the Sign in form", () => {
    cy.get(".header_signin").click();
    cy.get("input").each((input) => {
      cy.wrap(input).type("Test1");
    });
  });
  it.only("Open Sign up form", () => {
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
  });
});
