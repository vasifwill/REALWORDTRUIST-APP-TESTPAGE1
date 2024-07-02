describe('Test with backedn', () => {
  beforeEach('Login application',() => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: "tags.json"})
    //cy.intercept('GET', path:'tags', {fixture: 'tags.json})
    cy.loginApp()
  });
  
  //check api post(create)
  it('create article', () => {

    cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/').as('postArticle')

    cy.contains('New Article').click()
    cy.get('[placeholder="Article Title"').type('this is Vasif Article Title')
    cy.get('[formcontrolname="description"').type('this is Vasif article description')
    cy.get('[formcontrolname="body"]').type('thisis vasif article body')
    cy.contains(' Publish Article ').click()

// cy.intercept('POST, '**/articles', (req) => {
// req.body.article.description.to.equal('This is vasif article description)}).as('postArticle)


// cy.intercept('POST, '**/articles', (req) => {
// req.reply( res => {

  // expect(res.body.article.description.to.equal('This is vasif article description)
// res.body.article.description = "This is vasif article description"
// )}



    

    cy.wait('@postArticle').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.response.body.article.title).to.equal('this is Vasif Article Title')
      expect(xhr.response.body.article.description).to.equal('this is Vasif article description')
      expect(xhr.response.body.article.body).to.equal('thisis vasif article body')
    })
  })

  //api get
  it('verify tags', () => {
    cy.get('[class="tag-list"').should('contain','Mamedov')
    .and('contain','Elisa Xanum')
    .and('contain','Baxter')

  })
//check like button
  it.only('verigy global articles like buttons', () => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture:'globalFeedArticle.json'})
    cy.contains('Global Feed').click()
    cy.get('app-article-list button').then(buttons => {
      expect(buttons[0]).to.contain('35')
      expect(buttons[1]).to.contain('777')
    })

    // another example to check button count after clicking

    cy.fixture('globalFeedArticle').then(file => {
      const articleLink = file.articles[0].slug
      file.articles[0].favoritesCount = 6
      cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/'+articleLink+'/favorite',file)

      cy.get('app-article-list button').eq(0).click().should('contain', '6')

    })

  })

  


})