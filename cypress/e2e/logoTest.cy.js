describe('Challenge Card Type Logo', () => {
  it('should add class and set inner HTML based on data.type', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html');

    cy.get('.challenges-container__challenge')
      .should('have.length', 1)
      .as('challengeCard');

    cy.get('@challengeCard').should('have.class', this.data.type);

    if (this.data.type === 'online') {
      cy.get('@challengeCard').should(
        'have.html',
        '<i class="fa-solid fa-globe"></i>'
      );
    } else {
      cy.get('@challengeCard').should(
        'have.html',
        '<i class="fa-solid fa-building-user"></i>'
      );
    }
  });
});
