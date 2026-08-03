class GaragePage {
  get messageOnEmptyPage() {
    return cy.contains(
      ".panel-empty_message",
      "You don’t have any cars in your garage",
    );
  }
  get addCarsButton() {
    return cy.contains(".btn-primary", "Add car");
  }
  get navigationPanel() {
    return cy.get(".flex-column");
  }
  get addCarModal() {
    return cy.get("app-add-car-modal");
  }
  get brandDropdown() {
    return cy.get("#addCarBrand");
  }
  get modelDropdown() {
    return cy.get("#addCarModel");
  }
  get carMileage() {
    return cy.get("#addCarMileage");
  }
  get crossButton() {
    return cy.get(".close");
  }
  get camcelButton() {
    return cy.get(".modal-footer .btn-secondary");
  }
  get addCarButton() {
    return cy.get(".modal-footer .btn-primary");
  }
  get editMenu() {
    return cy.get(".btn-edit .icon-edit");
  }
  get removeCarButton() {
    return cy.get(".modal-footer .btn-outline-danger");
  }
  get removeButtonOnPopup() {
    return cy.get(".modal-footer .btn-danger");
  }
  get carTile() {
    return cy.get(".car-item");
  }
  get fuelExpesesButton() {
    return cy.contains(".btn-success", "Add fuel expense");
  }
  get milesInput() {
    return cy.get("input.form-control");
  }
  get updateMilesButton() {
    return cy.get(".btn-sm");
  }
  visit() {
    cy.visit("/panel/garage");
  }
  openGaragePage() {
    cy.visit("/panel/garage");
  }
  openAddCarForm() {
    this.addCarsButton.click();
  }
  openBrandDropdown() {
    this.brandDropdown.click();
  }
  selectBrand(option) {
    this.brandDropdown.select(option);
  }
  selectModel(option) {
    this.modelDropdown.select(option);
  }
  enterMileage(quantity) {
    this.carMileage.type(quantity);
  }
  closeForm() {
    this.crossButton.click();
  }
  cancelChanges() {
    this.camcelButton.click();
  }
  addCarSubmit() {
    this.addCarButton.click();
  }
  openEditMenu() {
    this.editMenu.first().click();
  }
  removeCar() {
    this.removeCarButton.click();
  }
  confirmRemoveCar() {
    this.removeButtonOnPopup.click();
  }
  addCarToGarage(option1, option2, quantity) {
    this.openGaragePage();
    this.openAddCarForm();
    this.brandDropdown.select(option1);
    this.modelDropdown.select(option2);
    this.carMileage.type(quantity);
    this.addCarButton.click();
  }
}
export default new GaragePage();
