describe('Toggling Tags Method', () => {
  it('should toggle the active state of tags', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html');

    cy.get('.filterButton').click(); //Open the filter

    cy.get('#linuxTag').click();

    cy.get('#linuxTag').should('have.class', '-active');

    cy.get('#linuxTag').click();

    cy.get('#linuxTag').should('not.have.class', '-active');
  });
});
