describe('Testing editing a song', () => {
  before(() => {
    cy.visit('http://localhost:3000/');

    // Adding a test song
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
      .type('Pop');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('textarea')
      .type('This is a test song.');

    cy.get('[data-component="AddEditForm"]')
      .contains('Save')
      .click();
  });

  after(() => {
    cy.visit('http://localhost:3000/');

    // Deleting the test song
    cy.get('[data-component="SearchField"]')
      .find('input')
      .type('FdywxMK1H4');
    cy.get('button')
      .contains('Search')
      .click()
      .wait(2000);
    cy.get('[data-component="DataTable"]')
      .find('tbody')
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

  context('Testing the edit button', () => {
    it('has an edit button', () => {
      cy.get('[data-component="DataTable"]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .click();
      cy.get('button').contains('Edit song');
    });

    it('can click edit button', () => {
      cy.get('[data-component="DataTable"]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .click();
      cy.get('button')
        .contains('Edit song')
        .click();
      cy.get('button')
        .contains('Cancel')
        .click();
    });
  });

  context('Testing editing a song', () => {
    it('can edit a song', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('FdywxMK1H4')
        .click();
      cy.get('button')
        .contains('Edit song')
        .click();

      cy.get('[data-component="AddEditForm"]')
        .find('form')
        .find('input')
        .eq(0)
        .type(' Testing');
      cy.get('[data-component="AddEditForm"]')
        .find('form')
        .find('input')
        .eq(1)
        .clear()
        .type('Edit Tester');
      cy.get('[data-component="AddEditForm"]')
        .find('form')
        .find('textarea')
        .type(' Now this test song has been edited.');

      cy.get('[data-component="AddEditForm"]')
        .contains('Save')
        .click();
    });

    it('did edit the song', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('Edit Tester');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('FdywxMK1H4 Testing')
        .click();
      cy.get('p').contains(
        'This is a test song. Now this test song has been edited.',
      );
    });
  });
});
