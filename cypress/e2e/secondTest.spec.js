
describe('log out', () => {

    beforeEach('logout to the app', () => {
        cy.loginApp()
    })


    it('verify use can logout succesfully',{retries:2}, () => {
        cy.contains('Settings').click()
        cy.contains(' Or click here to logout. ').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})