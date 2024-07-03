// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginApp', () => {
    const signinBody = {"user":{"email":Cypress.env('username'),"password":Cypress.env('password')}}
    cy.request('POST', Cypress.env('apiUrl')+'/api/users/login', signinBody).its('body').then( body => {
        cy.wrap(body.user.token).as('token')
        
        const token = body.user.token
    //get token from local storage
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('jwtToken', token)
            }
        })
    
    })
    
  
    // cy.visit('/login')
    // cy.get('[placeholder="Email"').type('vasif.will@gmail.com')
    // cy.get('[placeholder="Password"').type('Baxter@2020')
    // cy.get('form').submit()
})