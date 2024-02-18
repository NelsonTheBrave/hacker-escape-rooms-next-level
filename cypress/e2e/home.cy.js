describe('Launch site', () => {
  it('Website is up and running.', () => {
    cy.visit('')
    

  })
})
describe('clicks a button', () => {
  it('clicks the first button with class ".buttons__onsiteBtn" and navigates to another page', () => {
    cy.visit('');
    cy.get('.buttons__onsiteBtn').eq(0).click();
    cy.url().should('include', 'http://localhost:5500/challenges.html?type=onsite');
  });
});

describe('Checks different pages and looks h1 with corresponding text ', () =>{
  it('Checks all pages with an h1 and check texts', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html?type=online')
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms')

    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite')
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms')
    
    
    cy.visit('http://127.0.0.1:5500/index.html#our-story')
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms')
    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite#contact-us').contains('Contact Us').get('a')

    
   })
 })