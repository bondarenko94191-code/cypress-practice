/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";

describe("Login", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
  });

  it("Should display login form", () => {
    SignInForm.signInModalWindow.should("be.visible");
    SignInForm.rememberMeCheckbox.should("be.visible");
    SignInForm.rememberMeCheckbox.should("not.be.checked");
    SignInForm.loginButton.should("be.disabled");
  });

  it("Should login with valid credentials", () => {
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
  });
  it("Successfull login with checked Remember me checkbox", () => {
    SignInForm.rememberMeCheckbox.check();
    SignInForm.login(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
  });
  it("Unsuccessful login with invalid password", () => {
    SignInForm.login(Cypress.env("MAIN_USER_EMAIL"), "test12Test");
    SignInForm.wrongCredentialsMessage.should("be.visible");
  });
  it("Unsuccessful login with invalid email", () => {
    SignInForm.login(
      "Tiupalova@example.com",
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    SignInForm.wrongCredentialsMessage.should("be.visible");
  });

  it("Should display error message for empty email field", () => {
    SignInForm.triggerErrorMessage(SignInForm.emailInput);
    SignInForm.emptyEmailMessage.should("be.visible");
    SignInForm.passwordInput.type("Test1234");
    SignInForm.loginButton.should("be.disabled");
  });

  it("Should display error message for empty password field", () => {
    SignInForm.triggerErrorMessage(SignInForm.passwordInput);
    SignInForm.emptyPasswordMessage.should("be.visible");
  });
});

describe("Remember me checkbox", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
  });
  it("Check checkbox Remember me", () => {
    SignInForm.rememberMeCheckbox.check();
    SignInForm.rememberMeCheckbox.should("be.checked");
  });
  it("Check that checkbox can be unchecked", () => {
    SignInForm.rememberMeCheckbox.check();
    SignInForm.rememberMeCheckbox.should("be.checked");
    SignInForm.rememberMeCheckbox.uncheck();
    SignInForm.rememberMeCheckbox.should("not.be.checked");
  });
});

describe("Forgot password", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
  });
  it("Check ability to open the Restore password modal window", () => {
    SignInForm.openRestorePasswordModal();
    SignInForm.restorePasswordModal.should("be.visible");
  });
});
