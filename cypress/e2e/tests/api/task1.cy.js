/// <reference types="cypress" />
let sid;
let addedCarId = [];
before(() => {
  cy.request("POST", "/api/auth/signin", {
    email: Cypress.env("MAIN_USER_EMAIL"),
    password: Cypress.env("MAIN_USER_PASSWORD"),
  }).then((res) => {
    expect(res.status).to.eq(200);
    sid = JSON.stringify(res.headers["set-cookie"]).split(";")[0].split("=")[1];
  });
});
beforeEach(() => {
  cy.visit("https://qauto.forstudy.space/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
});

it("Get user info", () => {
  cy.request({
    method: "GET",
    url: "/api/users/profile",
    headers: {
      Cookie: `sid=${sid}`,
    },
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.data.name).to.eq("Alina");
    expect(res.body.data.lastName).to.eq("Tiupalova");
  });
});

it("Add new car ro Garage (Ford Mondeo)", () => {
  cy.request({
    method: "POST",
    url: "/api/cars",
    body: {
      carBrandId: 3,
      carModelId: 14,
      mileage: 15000,
    },
    headers: {
      Cookie: `sid=${sid}`,
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.data.brand).to.eq("Ford");
    expect(res.body.data.model).to.eq("Mondeo");
    expect(res.body.data.mileage).to.eq(15000);
    addedCarId.push(res.body.data.id);
  });
});
it("Add new car ro Garage (Audi TT)", () => {
  cy.request({
    method: "POST",
    url: "/api/cars",
    body: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 15000,
    },
    headers: {
      Cookie: `sid=${sid}`,
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.data.brand).to.eq("Audi");
    expect(res.body.data.model).to.eq("TT");
    expect(res.body.data.mileage).to.eq(15000);
    addedCarId.push(res.body.data.id);
  });
});
it("Add new car ro Garage (Porsche Cayenne)", () => {
  cy.request({
    method: "POST",
    url: "/api/cars",
    body: {
      carBrandId: 4,
      carModelId: 17,
      mileage: 15000,
    },
    headers: {
      Cookie: `sid=${sid}`,
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.data.brand).to.eq("Porsche");
    expect(res.body.data.model).to.eq("Cayenne");
    expect(res.body.data.mileage).to.eq(15000);
    addedCarId.push(res.body.data.id);
  });
});
it("Delete all cars", () => {
  cy.wrap(addedCarId).each((id) => {
    cy.request({
      method: "DELETE",
      url: `/api/cars/${id}`,
      headers: {
        Cookie: `sid=${sid}`,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.carId).to.eq(id);
    });
  });
});

it("Update mileage for Audi TT", () => {
  cy.request({
    method: "PUT",
    url: `/api/cars/545646`,
    body: {
      mileage: 20000,
    },
    headers: {
      Cookie: `sid=${sid}`,
    },
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.data.mileage).to.eq(20000);
  });
});
