describe('Testing pagination of database', () => {
  before(() => {
    cy.visit('http://localhost:3000/');

    // Adding test song
    cy.get('[data-component="AddEditButton"]').click();

    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(0)
      .type('FdywxMK1H4');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(1)
      .type('Tester');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(2)
      .type('Testing');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(3)
      .type('Electronic Pop Rock');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('textarea')
      .type('Hmmm, ... pagination');

    cy.get('[data-component="AddEditForm"]')
      .contains('Save')
      .click();
  });

  after(() => {
    cy.visit('http://localhost:3000/');

    // Deleting test song
    cy.get('[data-component="SearchField"]')
      .find('input')
      .type('FdywxMK1H4');
    cy.get('button')
      .contains('Search')
      .click();
    cy.get('[data-component="DataTable"]')
      .find('tbody')
      .wait(2000)
      .contains('FdywxMK1H4')
      .click();
    cy.get('button')
      .contains('Delete song')
      .click();
    cy.get('button')
      .contains('OK')
      .click();
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('Testing pagination', () => {
    it('has pagination buttons', () => {
      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Prev');
      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Next');
    });

    it('will disable buttons when at limits', () => {
      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Prev')
        .should('be.disabled');

      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Next')
        .should('be.disabled');
    });

    it('buttons diabled on no content', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Prev')
        .should('be.disabled');
      cy.get('[data-component="DataTable"]')
        .find('button')
        .contains('Next')
        .should('be.disabled');
    });
  });
});
