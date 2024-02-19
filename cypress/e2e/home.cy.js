describe('Launch site', () => {
  it('Website is up and running.', () => {
    cy.visit('');
  });
});
describe('clicks a button', () => {
  it('clicks the first button with class ".buttons__onsiteBtn" and navigates to another page and checks for h1-elements', () => {
    cy.visit('');
    cy.get('.buttons__onsiteBtn').eq(0).click();
    cy.url()
      .should('include', 'http://localhost:5500/challenges.html?type=onsite')
      .get('h1');
  });
});

describe('Checks different pages and looks h1 with corresponding text ', () => {
  it('Checks all pages with an h1 and check texts', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html?type=online');
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms');

    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite');
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms');

    cy.visit('http://127.0.0.1:5500/index.html#our-story');
    cy.get('h1').eq(0).should('have.text', 'Hacker Escape Rooms');
    cy.visit('http://127.0.0.1:5500/challenges.html?type=onsite#contact-us')
      .contains('Contact Us')
      .get('a');
  });
});

describe('checks that it gets an error when not choosing date', () => {
  it('clicks button to get to modal and clicks button without choosing date to get error message', () => {
    cy.visit('http://127.0.0.1:5500/challenges.html?type=online');
    cy.contains('Take challenge online').click();
    cy.contains('Search available times').click();
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Please choose a date');
    });
  });
});
