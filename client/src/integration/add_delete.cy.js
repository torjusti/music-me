describe('Testing adding song', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('Testing add button', () => {
    it('has an add button', () => {
      cy.get('[data-component="AddEditButton"]').contains('Add song');
    });

    it('is possible to click the button', () => {
      cy.get('[data-component="AddEditButton"]').click();
      cy.get('[data-component="AddEditForm"]')
        .contains('Cancel')
        .click();
    });
  });

  context('Testing adding song', () => {
    it('can add song', () => {
      cy.get('[data-component="AddEditButton"]').click();

      cy.get('[data-component="AddEditForm"]')
        .find('form')
        .find('.star')
        .eq(2)
        .click();
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
        .type('Testing adding song');

      cy.get('[data-component="AddEditForm"]')
        .contains('Save')
        .click();
    });

    it('test song was added', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4');
      cy.get('button')
        .contains('Search')
        .click();
      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('tbody')
        .contains('FdywxMK1H4');
    });
  });
});

describe('Testing deleting song', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('Testing delete button', () => {
    it('has a delete button', () => {
      cy.get('[data-component="DataTable"]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .click();
      cy.get('button').contains('Delete song');
    });

    it('is possible to click the button', () => {
      cy.get('[data-component="DataTable"]')
        .find('table')
        .find('tbody')
        .find('tr')
        .first()
        .click();
      cy.get('button')
        .contains('Delete song')
        .click();
      cy.get('button')
        .contains('Cancel')
        .click();
    });
  });

  context('Testing deleting song', () => {
    it('is possible to delete a song', () => {
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
        .contains('Delete song')
        .click();
      cy.get('button')
        .contains('OK')
        .click();
    });

    it('should correctly indicate a lack of songs', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('FdywxMK1H4');
      cy.get('button')
        .contains('Search')
        .click();
      cy.wait(2000);
      cy.get('span').contains('No results');
    });
  });
});
