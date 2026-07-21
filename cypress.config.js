const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    retries: {
      runMode: 1,
      openMode: 1,
    },
    defaultCommandTimeout: 5000,
  },
});
