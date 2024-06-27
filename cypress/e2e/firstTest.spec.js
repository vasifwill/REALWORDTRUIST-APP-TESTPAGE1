describe('Test with backedn', () => {
  beforeEach('Login application',() => {
    cy.loginApp()
  });
  
  
  it('first', () => {
    cy.log('we looged in')
  })
})