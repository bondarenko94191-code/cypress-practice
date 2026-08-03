/// <reference types="cypress" />
import HomePage from "../../pom/pages/HomePage";
import SignUpForm from "../../pom/forms/SignUpForm";
import urls from "../../test-data/urls.json";

describe("Registration", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
  });

  it.skip("Successful registration", () => {
    SignUpForm.registration(
      "Alina",
      "Tiupalova",
      `alina.tiupalova${Date.now()}@gmail.com`,
      "Test1234",
      "Test1234",
    );
    cy.get("#userNavDropdown").should("be.visible");
    cy.url().should("eq", urls.garagePage);
  });

  it("Unsuccessful registration of existing user", () => {
    SignUpForm.registration(
      "Alina",
      "Tiupalova",
      `bondarenko94191@gmail.com`,
      "Test1234",
      "Test1234",
    );
    SignUpForm.userExistNotification
      .should("be.visible")
      .and("have.text", "User already exists");
  });
});
describe("Register button", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
  });
  it("Register button is disabled when all fields are empty", () => {
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  it("Register button is disabled when all field are filled in with wrong data", () => {
    SignUpForm.enterName("A");
    SignUpForm.enterLastName("B");
    SignUpForm.enterEmail("invalidemail");
    SignUpForm.enterPassword("123");
    SignUpForm.enterRepeatPassword("456");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });
});

describe("Name field validation", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
    SignUpForm.clearInput();
  });
  it("Valid length(2digits) in the Name field", () => {
    SignUpForm.enterName("Al");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Valid length(20 digits) in the Name field", () => {
    SignUpForm.enterName("A".repeat(20));
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Empty Name field", () => {
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.nameEmptyMessage.should("be.visible");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  it("Invalid length(1 digits) in the Name field", () => {
    SignUpForm.enterName("A");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.invalidLengthNameMessage.should("be.visible");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  it("Invalid length(21 digits) in the Name field", () => {
    SignUpForm.enterName("A".repeat(21));
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.invalidLengthNameMessage.should("be.visible");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  //Test is failed. Seems like the bug. The name with space at the beginning and at the end is valid, but the system shows that it is invalid.
  it("Name format is valid (Backspace at the beggining and at the end)", () => {
    SignUpForm.enterName(" Alina ");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  //Test is failed. Seems like the bug. The name with `-` is valid, but the system shows that it is invalid.
  it("Name format is valid (Complex name with `-`", () => {
    SignUpForm.enterName("Anna-Mariia");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.nameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Name format is invalid(Eng+numbers", () => {
    SignUpForm.enterName("Alina123");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Only numbers", () => {
    SignUpForm.enterName("12345");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Eng+Special symbols", () => {
    SignUpForm.enterName("Alina@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Special symbols", () => {
    SignUpForm.enterName("@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Cyrillic", () => {
    SignUpForm.enterName("Алина");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Cyrillic+nubers", () => {
    SignUpForm.enterName("Алина123");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Cyrillic+special characters", () => {
    SignUpForm.enterName("Алина@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
  it("Name format is invalid(Cyrillic+Latin", () => {
    SignUpForm.enterName("АлинаAlina");
    SignUpForm.triggerErrorMessage(SignUpForm.nameInput);
    SignUpForm.invalidNameMessage.should("be.visible");
  });
});
describe("Last name field validation", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
    SignUpForm.clearInput;
  });
  it("Valid length(2digits) in the Last name field", () => {
    SignUpForm.enterLastName("Ti");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Valid length(20 digits) in the Last name field", () => {
    SignUpForm.enterLastName("A".repeat(20));
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Empty Last name field", () => {
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.lastNameEmptyMessage.should("be.visible");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  it("Invalid length(1 digits) in the Last name field", () => {
    SignUpForm.enterLastName("A");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.invalidLengthLastNameMessage.should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  it("Invalid length(21 digits) in the Last name field", () => {
    SignUpForm.enterLastName("A".repeat(21));
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    SignUpForm.invalidLengthLastNameMessage.should("be.visible");
    SignUpForm.submitRegistrationButton.should("be.disabled");
  });

  //Test is failed. Seems like the bug. The name with space at the beginning and at the end is valid, but the system shows that it is invalid.
  it("Last name format is valid (Backspace at the beggining and at the end)", () => {
    SignUpForm.enterLastName(" Tiupalova ");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  //Test is failed. Seems like the bug. The name with `-` is valid, but the system shows that it is invalid.
  it("Last name format is valid (Complex name with `-`", () => {
    SignUpForm.enterLastName("Tiupalova-Bondarenko");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.lastNameInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Last name format is invalid(Eng+numbers", () => {
    SignUpForm.enterLastName("Tiupalova123");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Only numbers", () => {
    SignUpForm.enterLastName("12345");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Eng+Special symbols", () => {
    SignUpForm.enterLastName("Tiupalova@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Special symbols", () => {
    SignUpForm.enterLastName("@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic", () => {
    SignUpForm.enterLastName("Тюпалова");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+nubers", () => {
    SignUpForm.enterLastName("Тюпалова123");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+special characters", () => {
    SignUpForm.enterLastName("Тюпалова@#$%");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+Latin", () => {
    SignUpForm.enterLastName("ТюпаловаAlina");
    SignUpForm.triggerErrorMessage(SignUpForm.lastNameInput);
    SignUpForm.invalidLastNameMessage.should("be.visible");
    SignUpForm.lastNameInput
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
});

describe("Email field validation", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
    SignUpForm.clearInput();
  });
  it("Valid email format", () => {
    SignUpForm.enterEmail("test@example.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty email field", () => {
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.emailEmptyMessage.should("be.visible");
  });
  it("Invalid email format (missing @)", () => {
    SignUpForm.enterEmail("testexample.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (missing domain)", () => {
    SignUpForm.enterEmail("test@.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (missing username)", () => {
    SignUpForm.enterEmail("@example.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (missing . in domain)", () => {
    SignUpForm.enterEmail("test@examplecom");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (special characters)", () => {
    SignUpForm.enterEmail("test@exa!mple.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (spaces)", () => {
    SignUpForm.enterEmail("test @example.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalid email format (multiple @)", () => {
    SignUpForm.enterEmail("test@@example.com");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  //There is no validation for the email  max length in the system. The test is failed. The system allows to enter more than 64 characters in the email field.
  it("Invalidlength email format (too long)", () => {
    const longEmail = "a".repeat(65) + "@example.com";
    SignUpForm.enterEmail(longEmail);
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
  it("Invalidlength email format (too short)", () => {
    SignUpForm.enterEmail("a@b.c");
    SignUpForm.triggerErrorMessage(SignUpForm.emailInput);
    SignUpForm.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.incorrectEmailMessage.should("be.visible");
  });
});
describe("Password field validation", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
    SignUpForm.clearInput();
  });
  it("Valid password format", () => {
    SignUpForm.enterPassword("Test1234");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Valid password format 8 characters", () => {
    SignUpForm.enterPassword("Test1234");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Valid password format 15 characters", () => {
    SignUpForm.enterPassword("Test12345678901");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty password field", () => {
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.emptyPasswordMessage.should("be.visible");
  });
  it("Invalid password format (too short) 7 characters", () => {
    SignUpForm.enterPassword("Test123");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.invalidLengthPasswordMessage.should("be.visible");
  });
  it("Invalid password format (too long 16 characters)", () => {
    SignUpForm.enterPassword("Test1234567890te");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.invalidLengthPasswordMessage.should("be.visible");
  });
  it("Invalid password format (no numbers)", () => {
    SignUpForm.enterPassword("TestPassword");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.invalidLengthPasswordMessage.should("be.visible");
  });
  it("Invalid password format (no uppercase letter)", () => {
    SignUpForm.enterPassword("test1234");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.invalidLengthPasswordMessage.should("be.visible");
  });
  it("Invalid password format (no lowercase letter)", () => {
    SignUpForm.enterPassword("TEST1234");
    SignUpForm.triggerErrorMessage(SignUpForm.passwordInput);
    SignUpForm.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.invalidLengthPasswordMessage.should("be.visible");
  });
});
describe("Re-enter password field validation", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignUpForm();
    SignUpForm.clearInput();
  });
  it("Valid re-enter password format", () => {
    SignUpForm.enterPassword("Test1234");
    SignUpForm.enterRepeatPassword("Test1234");
    SignUpForm.triggerErrorMessage(SignUpForm.repeatPasswordInput);
    SignUpForm.repeatPasswordInput.should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty re-enter password field", () => {
    SignUpForm.triggerErrorMessage(SignUpForm.repeatPasswordInput);
    SignUpForm.repeatPasswordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.reEnterPasswordEmptyMessage.should("be.visible");
  });
  it("Invalid re-enter password format (does not match)", () => {
    SignUpForm.enterPassword("Test1234");
    SignUpForm.enterRepeatPassword("Test12345");
    SignUpForm.triggerErrorMessage(SignUpForm.repeatPasswordInput);
    SignUpForm.repeatPasswordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    SignUpForm.passwordDoNotMatchMessage.should("be.visible");
  });
});
