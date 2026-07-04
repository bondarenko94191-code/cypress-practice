const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://example.cypress.io",
    retries: {
      runMode: 2,
      openMode: 2,
    },
    defaultCommandTimeout: 5000,
  },
});
