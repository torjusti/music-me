describe('Testing searching in database', () => {
  before(() => {
    cy.visit('http://localhost:3000/');

    // Adding test song
    cy.get('[data-component="AddEditButton"]').click();

    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(0)
      .type('FdywxMK1H4 :D');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(1)
      .type('Illidan');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(2)
      .type('Avocado 3');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(3)
      .type('Electronic Pop Rock');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('textarea')
      .type('Ohhhh, such test. WOW');

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

  context('Test search for all columns', () => {
    it('have a serch button and search field', () => {
      cy.get('[data-component="SearchField"]').find('input');
      cy.get('button')
        .contains('Search')
        .click();
    });

    it('can search for tittle', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4 :D');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('FdywxMK1H4 :D');
    });

    it('can search for artist', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('Illidan');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('Illidan');
    });

    it('can search for album', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('3');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('Avocado 3');

      cy.get('[data-component="SearchField"]')
        .find('input')
        .clear()
        .type('Avocado');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('Avocado 3');
    });

    it('can search for genre', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('Electronic');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('Electronic Pop Rock');
    });
  });
});
