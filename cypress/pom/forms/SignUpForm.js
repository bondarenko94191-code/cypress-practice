class SignUpForm {
  get nameInput() {
    return cy.get("#signupName");
  }
  get lastNameInput() {
    return cy.get("#signupLastName");
  }
  get emailInput() {
    return cy.get("#signupEmail");
  }
  get passwordInput() {
    return cy.get("#signupPassword");
  }
  get repeatPasswordInput() {
    return cy.get("#signupRepeatPassword");
  }
  get submitRegistrationButton() {
    return cy.get(".modal-footer .btn-primary");
  }
  get userExistNotification() {
    return cy.get(".alert-danger");
  }
  get nameEmptyMessage() {
    return cy.contains(".invalid-feedback", "Name required");
  }
  get invalidLengthNameMessage() {
    return cy.contains(
      ".invalid-feedback",
      "Name has to be from 2 to 20 characters long",
    );
  }
  get invalidNameMessage() {
    return cy.contains(".invalid-feedback", "Name is invalid");
  }
  get lastNameEmptyMessage() {
    return cy.contains(".invalid-feedback", "Last name required");
  }
  get invalidLengthLastNameMessage() {
    return cy.contains(
      ".invalid-feedback",
      "Last name has to be from 2 to 20 characters long",
    );
  }
  get invalidLastNameMessage() {
    return cy.contains(".invalid-feedback", "Last name is invalid");
  }
  get emailEmptyMessage() {
    return cy.contains(".invalid-feedback", "Email required");
  }
  get incorrectEmailMessage() {
    return cy.contains(".invalid-feedback", "Email is incorrect");
  }
  get emptyPasswordMessage() {
    return cy.contains(".invalid-feedback", "Password required");
  }
  get invalidLengthPasswordMessage() {
    return cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  }
  get reEnterPasswordEmptyMessage() {
    return cy.contains(".invalid-feedback", "Re-enter password required");
  }
  get passwordDoNotMatchMessage() {
    return cy.contains(".invalid-feedback", "Passwords do not match");
  }
  get inputField() {
    return cy.get("input");
  }

  enterName(name) {
    this.nameInput.type(name);
  }
  enterLastName(lastName) {
    this.lastNameInput.type(lastName);
  }
  enterEmail(email) {
    this.emailInput.type(email);
  }
  enterPassword(password) {
    this.passwordInput.type(password);
  }
  enterRepeatPassword(repeatPassword) {
    this.repeatPasswordInput.type(repeatPassword);
  }
  clickSignUpButton() {
    this.submitRegistrationButton.click();
  }
  registration(name, lastName, email, password, repeatPassword) {
    this.enterName(name);
    this.enterLastName(lastName);
    this.enterEmail(email);
    this.enterPassword(password);
    this.enterRepeatPassword(repeatPassword);
    this.clickSignUpButton();
  }
  triggerErrorMessage(field) {
    field.focus().blur();
  }
  clearInput(input) {
    this.inputField.each((input) => {
      cy.wrap(input).clear();
    });
  }
}
export default new SignUpForm();
