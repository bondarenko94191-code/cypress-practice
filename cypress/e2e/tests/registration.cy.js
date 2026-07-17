/// <reference types="cypress" />

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
  });

  it("Successful registration", () => {
    cy.get("#signupName").type("Alina");
    cy.get("#signupLastName").type("Tiupalova");
    cy.get("#signupEmail").type(`alina.tiupalova${Date.now()}@gmail.com`);
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupRepeatPassword").type("Test1234");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").click();
    });
    cy.get("#userNavDropdown").should("be.visible");
    cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
  });

  it("Unsuccessful registration of existing user", () => {
    cy.get("#signupName").type("Alina");
    cy.get("#signupLastName").type("Tiupalova");
    cy.get("#signupEmail").type("bondarenko94191@gmail.com");
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupRepeatPassword").type("Test1234");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").click();
    });
    cy.get(".alert-danger")
      .should("be.visible")
      .and("have.text", "User already exists");
  });
});
describe("Register button", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
  });
  it("Register button is disabled when all fields are empty", () => {
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  it("Register button is disabled when all field are filled in with wrong data", () => {
    cy.get("#signupName").type("A");
    cy.get("#signupLastName").type("B");
    cy.get("#signupEmail").type("invalidemail");
    cy.get("#signupPassword").type("123");
    cy.get("#signupRepeatPassword").type("456");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
});

describe("Name field validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get("input").each((input) => {
      cy.wrap(input).clear();
    });
  });
  it("Valid length(2digits) in the Name field", () => {
    cy.get("#signupName").type("Al");
    cy.get("#signupName").focus().blur();
    cy.get("#signupName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Valid length(20 digits) in the Name field", () => {
    cy.get("#signupName").type("A".repeat(20));
    cy.get("#signupName").focus().blur();
    cy.get("#signupName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Empty Name field", () => {
    cy.get("#signupName").focus().blur();
    cy.get("#signupName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(".invalid-feedback", "Name required").should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });

  it("Invalid length(1 digits) in the Name field", () => {
    cy.get("#signupName").type("A");
    cy.get("#signupName").blur();
    cy.get("#signupName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(
      ".invalid-feedback",
      "Name has to be from 2 to 20 characters long",
    ).should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  it("Invalid length(21 digits) in the Name field", () => {
    cy.get("#signupName").type("A".repeat(21));
    cy.get("#signupName").blur();
    cy.get("#signupName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(
      ".invalid-feedback",
      "Name has to be from 2 to 20 characters long",
    ).should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  //Test is failed. Seems like the bug. The name with space at the beginning and at the end is valid, but the system shows that it is invalid.
  it("Name format is valid (Backspace at the beggining and at the end)", () => {
    cy.get("#signupName").type(" Alina ");
    cy.get("#signupName").focus().blur();
    cy.get("#signupName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  //Test is failed. Seems like the bug. The name with `-` is valid, but the system shows that it is invalid.
  it("Name format is valid (Complex name with `-`", () => {
    cy.get("#signupName").type("Anna-Mariia");
    cy.get("#signupName").focus().blur();
    cy.get("#signupName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Name format is invalid(Eng+numbers", () => {
    cy.get("#signupName").type("Alina123");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Only numbers", () => {
    cy.get("#signupName").type("12345");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Eng+Special symbols", () => {
    cy.get("#signupName").type("Alina@#$%");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Special symbols", () => {
    cy.get("#signupName").type("@#$%");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Cyrillic", () => {
    cy.get("#signupName").type("Алина");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Cyrillic+nubers", () => {
    cy.get("#signupName").type("Алина123");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Cyrillic+special characters", () => {
    cy.get("#signupName").type("Алина@#$%");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
  it("Name format is invalid(Cyrillic+Latin", () => {
    cy.get("#signupName").type("АлинаAlina");
    cy.get("#signupName").blur();
    cy.contains(".invalid-feedback", "Name is invalid").should("be.visible");
  });
});
describe("Last name field validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get("input").each((input) => {
      cy.wrap(input).clear();
    });
  });
  it("Valid length(2digits) in the Last name field", () => {
    cy.get("#signupLastName").type("Ti");
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Valid length(20 digits) in the Last name field", () => {
    cy.get("#signupLastName").type("A".repeat(20));
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69",
    );
  });
  it("Empty Last name field", () => {
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(".invalid-feedback", "Last name required").should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });

  it("Invalid length(1 digits) in the Last name field", () => {
    cy.get("#signupLastName").type("A");
    cy.get("#signupLastName").blur();
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(
      ".invalid-feedback",
      "Last name has to be from 2 to 20 characters long",
    ).should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  it("Invalid length(21 digits) in the Last name field", () => {
    cy.get("#signupLastName").type("A".repeat(21));
    cy.get("#signupLastName").blur();
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.contains(
      ".invalid-feedback",
      "Last name has to be from 2 to 20 characters long",
    ).should("be.visible");
    cy.get(".modal-footer").within(() => {
      cy.get(".btn-primary").should("be.disabled");
    });
  });
  //Test is failed. Seems like the bug. The name with space at the beginning and at the end is valid, but the system shows that it is invalid.
  it("Last name format is valid (Backspace at the beggining and at the end)", () => {
    cy.get("#signupLastName").type(" Tiupalova ");
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  //Test is failed. Seems like the bug. The name with `-` is valid, but the system shows that it is invalid.
  it("Last name format is valid (Complex name with `-`", () => {
    cy.get("#signupLastName").type("Tiupalova-Bondarenko");
    cy.get("#signupLastName").focus().blur();
    cy.get("#signupLastName").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Last name format is invalid(Eng+numbers", () => {
    cy.get("#signupLastName").type("Tiupalova123");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Only numbers", () => {
    cy.get("#signupLastName").type("12345");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Eng+Special symbols", () => {
    cy.get("#signupLastName").type("Tiupalova@#$%");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Special symbols", () => {
    cy.get("#signupLastName").type("@#$%");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic", () => {
    cy.get("#signupLastName").type("Тюпалова");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+nubers", () => {
    cy.get("#signupLastName").type("Тюпалова123");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+special characters", () => {
    cy.get("#signupLastName").type("Тюпалова@#$%");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
  it("Last name format is invalid(Cyrillic+Latin", () => {
    cy.get("#signupLastName").type("ТюпаловаAlina");
    cy.get("#signupLastName").blur();
    cy.contains(".invalid-feedback", "Last name is invalid").should(
      "be.visible",
    );
    cy.get("#signupLastName")
      .should("have.css", "border-color")
      .and("eq", "rgb(220, 53, 69)");
  });
});
describe("Email field validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get("input").each((input) => {
      cy.wrap(input).clear();
    });
  });
  it("Valid email format", () => {
    cy.get("#signupEmail").type("test@example.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty email field", () => {
    cy.get("#signupEmail").focused().blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email required").should("be.visible");
  });
  it("Invalid email format (missing @)", () => {
    cy.get("#signupEmail").type("testexample.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (missing domain)", () => {
    cy.get("#signupEmail").type("test@.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (missing username)", () => {
    cy.get("#signupEmail").type("@example.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (missing . in domain)", () => {
    cy.get("#signupEmail").type("test@examplecom");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (special characters)", () => {
    cy.get("#signupEmail").type("test@exa!mple.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (spaces)", () => {
    cy.get("#signupEmail").type("test @example.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalid email format (multiple @)", () => {
    cy.get("#signupEmail").type("test@@example.com");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  //There is no validation for the email  max length in the system. The test is failed. The system allows to enter more than 64 characters in the email field.
  it("Invalidlength email format (too long)", () => {
    const longEmail = "a".repeat(65) + "@example.com";
    cy.get("#signupEmail").type(longEmail);
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
  it("Invalidlength email format (too short)", () => {
    cy.get("#signupEmail").type("a@b.c");
    cy.get("#signupEmail").blur();
    cy.get("#signupEmail").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Email is incorrect").should("be.visible");
  });
});
describe("Password field validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get("input").each((input) => {
      cy.wrap(input).clear();
    });
  });
  it("Valid password format", () => {
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Valid password format 8 characters", () => {
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Valid password format 15 characters", () => {
    cy.get("#signupPassword").type("Test12345678901");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty password field", () => {
    cy.get("#signupPassword").focused().blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Password required").should("be.visible");
  });
  it("Invalid password format (too short) 7 characters", () => {
    cy.get("#signupPassword").type("Test123");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
  });
  it("Invalid password format (too long 16 characters)", () => {
    cy.get("#signupPassword").type("Test1234567890te");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
  });
  it("Invalid password format (no numbers)", () => {
    cy.get("#signupPassword").type("TestPassword");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
  });
  it("Invalid password format (no uppercase letter)", () => {
    cy.get("#signupPassword").type("test1234");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
  });
  it("Invalid password format (no lowercase letter)", () => {
    cy.get("#signupPassword").type("TEST1234");
    cy.get("#signupPassword").blur();
    cy.get("#signupPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(
      ".invalid-feedback",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
  });
});
describe("Re-enter password field validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".btn-primary").as("signUpButton");
    cy.get("@signUpButton").click();
    cy.get("input").each((input) => {
      cy.wrap(input).clear();
    });
  });
  it("Valid re-enter password format", () => {
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupRepeatPassword").type("Test1234");
    cy.get("#signupRepeatPassword").blur();
    cy.get("#signupRepeatPassword").should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  it("Empty re-enter password field", () => {
    cy.get("#signupRepeatPassword").focused().blur();
    cy.get("#signupRepeatPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Re-enter password required").should(
      "be.visible",
    );
  });
  it("Invalid re-enter password format (does not match)", () => {
    cy.get("#signupPassword").type("Test1234");
    cy.get("#signupRepeatPassword").type("Test12345");
    cy.get("#signupRepeatPassword").blur();
    cy.get("#signupRepeatPassword").should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
    cy.contains(".invalid-feedback", "Passwords do not match").should(
      "be.visible",
    );
  });
});
