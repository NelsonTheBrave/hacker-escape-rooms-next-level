describe('Visit the site on GitHub pages', () => {
  it('Site should be running on GitHub pages', () => {
    cy.visit(
      'https://nelsonthebrave.github.io/hacker-escape-rooms-next-level/'
    );
    cy.get('h1').should('exist');
  });
});

describe('Visit landing page and navigate to online challenges and change filter', () => {
  it('Should navigate across the site with ease', () => {
    cy.visit(
      'https://nelsonthebrave.github.io/hacker-escape-rooms-next-level/'
    );
    cy.wait(900);

    cy.get('.buttons__onlineBtn').first().click();
    cy.url().should(
      'eq',
      'https://nelsonthebrave.github.io/hacker-escape-rooms-next-level/challenges.html?type=online'
    );

    cy.wait(900);
    cy.get('.filterButton').click();

    cy.get('#linux').click();

    cy.get('#13')
      .should('have.class', 'linux')
      .and('not.have.css', 'display', 'none');

    cy.get('#electronics').click();

    cy.get('.no-match-message').should('not.have.css', 'display', 'none');

    cy.get('.logo').click();
    cy.url().should(
      'eq',
      'https://nelsonthebrave.github.io/hacker-escape-rooms-next-level/index.html'
    );
  });
});
