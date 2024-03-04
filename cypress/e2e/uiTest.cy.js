describe('Visit the site on localhost:5500', () => {
  it('Site should be runing on localhost:5500', () => {
    cy.visit('http://localhost:5500');
    cy.get('h1').should('exist');
  });
});
