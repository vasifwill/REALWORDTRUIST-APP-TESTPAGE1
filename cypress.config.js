const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1800,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'https://conduit.bondaracademy.com/',
    specPattern:'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
