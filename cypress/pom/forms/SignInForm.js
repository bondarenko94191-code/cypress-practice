class SignInForm {
  get signInModalWindow() {
    return cy.get("app-signin-modal");
  }
  get rememberMeCheckbox() {
    return cy.get("#remember");
  }
  get forgotPasswordlink() {
    return cy.contains(".btn-link", "Forgot password");
  }
  get loginButton() {
    return cy.contains("app-signin-modal .btn-primary", "Login");
  }

  get emailInput() {
    return cy.get("input[name='email']");
  }
  get passwordInput() {
    return cy.get("input[name='password']");
  }
  get wrongCredentialsMessage() {
    return cy.contains(".alert-danger", "Wrong email or password");
  }
  get emptyEmailMessage() {
    return cy.contains(".invalid-feedback", "Email required");
  }
  get emptyPasswordMessage() {
    return cy.contains(".invalid-feedback", "Password required");
  }
  get restorePasswordModal() {
    return cy.get("app-forgot-password-modal");
  }

  submitLogin() {
    this.loginButton.click();
  }
  triggerErrorMessage(field) {
    field.focus().blur();
  }
  openRestorePasswordModal() {
    this.forgotPasswordlink.click();
  }
  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.submitLogin();
  }
}
export default new SignInForm();
