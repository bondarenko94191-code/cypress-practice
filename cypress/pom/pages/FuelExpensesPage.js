class FuelExpensesPage {
  get emptyStatePage() {
    return cy.get(".panel-empty_message");
  }

  get addFuelExpensesButton() {
    return cy.contains(".btn-primary", "Add an expense");
  }
  get closeFormButton() {
    return cy.get(".close");
  }
  get cancelButton() {
    return cy.get(".modal-footer .btn-secondary");
  }
  get addButton() {
    return cy.get(".modal-footer .btn-primary");
  }
  get vehicleDropDown() {
    return cy.get("#addExpenseCar");
  }
  get dateCalendar() {
    return cy.get("#addExpenseDate");
  }
  get mileageInput() {
    return cy.get("#addExpenseMileage");
  }
  get numberOfLitersInput() {
    return cy.get("#addExpenseLiters");
  }
  get totalCost() {
    return cy.get("#addExpenseTotalCost");
  }
  get addAnExpensesModal() {
    return cy.get("app-add-expense-modal");
  }
  get removeExpensesButton() {
    return cy.get(".btn-delete .icon-delete");
  }
  get editExpensesButton() {
    return cy.get(".btn-edit");
  }
  get editExpensesModal() {
    return cy.get("app-edit-expense-modal");
  }
  get saveEditButton() {
    return cy.contains(".btn-primary", "Save");
  }
  get expensesTable() {
    return cy.get(".expenses_table");
  }
  get deleteExpenseModal() {
    return cy.get("app-delete-expense-modal");
  }
  get removeButtonOnPopoup() {
    return cy.contains(".btn-danger", "Remove");
  }
  get errorDate() {
    return cy.get("app-add-expense-form .alert-danger");
  }
  get validationMessageLiters() {
    return cy.contains(".invalid-feedback", "Liters require");
  }
  get validationMessageCost() {
    return cy.contains(".invalid-feedback", "Total cost required");
  }

  get carSelectDropdown() {
    return cy.get("#carSelectDropdown");
  }
  get userProfileDropdown() {
    return cy.get("#userNavDropdown");
  }
  get fuelExpensesMenuItem() {
    return cy.contains("a", "Fuel expenses");
  }

  visit() {
    cy.visit("https://qauto.forstudy.space/panel/expenses");
  }
  openFuelExpensesPage() {
    this.userProfileDropdown.click();
    this.fuelExpensesMenuItem.click();
  }
  addExpenses(vehicle, date, mileage, liters, cost) {
    this.addFuelExpensesButton.click();
    this.vehicleDropDown.select(vehicle);
    this.dateCalendar.clear().type(date);
    this.mileageInput.clear().type(mileage);
    this.numberOfLitersInput.type(liters);
    this.totalCost.type(cost);
    this.addButton.click();
  }
  editExpenses() {
    this.editExpensesButton.click();
    this.totalCost.type("1000");
    this.saveEditButton.click();
  }
  removeExpenses() {
    this.removeExpensesButton.eq(0).click({ force: true });
    this.removeButtonOnPopoup.click();
  }
  triggerErrorForLiters() {
    this.addFuelExpensesButton.click();
    this.numberOfLitersInput.focus().blur();
  }
  triggerErrorForCost() {
    this.addFuelExpensesButton.click();
    this.totalCost.focus().blur();
  }
  selectCar(carName) {
    this.carSelectDropdown.click();
    cy.contains(".dropdown-item", carName).click();
  }
}
export default new FuelExpensesPage();
