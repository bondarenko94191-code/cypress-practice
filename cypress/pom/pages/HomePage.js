class HomePage {
  get signUpButton() {
    return cy.contains(".btn-primary", "Sign up");
  }
  get signInButton() {
    return cy.get(".header_signin");
  }


  visit() {
    cy.visit("/");
  }
  openSignUpForm() {
    this.signUpButton.click();
  }
  openSignInForm() {
    this.signInButton.click();
  }
}
export default new HomePage();
