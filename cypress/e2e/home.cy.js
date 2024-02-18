describe('Launch site', () => {
  it('Website is up and running.', () => {
    cy.visit('')
    

  })
})
describe('clicks a button', ()=>{
  it('clicks a button and navigates to other page', ()=>{
    cy.visit('')
    cy.wait(3000)
    cy.get('.buttons__onsiteBtn').as('btn').click({ multiple: true });
    cy.get('@btn').click();
    cy.url().should('include', 'http://localhost:5500/challenges.html?type=onsite');
  })
})
describe('Visits different pages and looks for certain elements', () =>{
  it('Checks for h1 on all pages.', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html?type=online').get('h1')
    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite').get('h1')
    cy.visit('http://127.0.0.1:5500/index.html#our-story').get('h1')
    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite#contact-us').contains('Contact Us').get('a')

    
   })
 })