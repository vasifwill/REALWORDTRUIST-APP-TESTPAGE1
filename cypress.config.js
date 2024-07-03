const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1800,
  viewportWidth: 1920,
  env:{
    username:'vasif.will@gmail.com',
    password:'Baxter@2020',
    apiUrl:'https://conduit-api.bondaracademy.com'
  },
  e2e: {
    baseUrl: 'https://conduit.bondaracademy.com/',
    specPattern:'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      const username = process.env.DB_USERNAME
      const password = process.env.DB_PASSWORD

      if(!password) {
        throw new Error(`missing password`)
      }

      config.env = {username, password}

      return config
    },
  },
});
