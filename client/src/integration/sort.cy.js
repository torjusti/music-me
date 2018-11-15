describe('Testing sorting', () => {
  before(() => {
    cy.visit('http://localhost:3000/');

    // Adding test song
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
      .type('A FdywxMK1H4 iaAovck4gd');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(1)
      .type('AAAAAAA1');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(2)
      .type('ZZZZZZZ2');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(3)
      .type('Pop');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('textarea')
      .type('Test, test, testing!!!');

    cy.get('[data-component="AddEditForm"]')
      .contains('Save')
      .click();

    cy.get('[data-component="AddEditButton"]').click();

    cy.get('[data-component="AddEditForm"]')
      .wait(2000)
      .find('form')
      .find('input')
      .eq(0)
      .type('Z Rrx6JNxt00 iaAovck4gd');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(1)
      .type('ZZZZZZZ1');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(2)
      .type('AAAAAAA2');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('input')
      .eq(3)
      .type('Rock');
    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('textarea')
      .type('Oh darn, even more testing.');

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

    cy.get('[data-component="SearchField"]')
      .wait(2000)
      .find('input')
      .clear()
      .type('Rrx6JNxt00');
    cy.get('button')
      .contains('Search')
      .click();
    cy.get('[data-component="DataTable"]')
      .find('tbody')
      .wait(2000)
      .contains('Rrx6JNxt00')
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

  context('Testing sorting by all columns', () => {
    it('can sort by song', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('th')
        .eq(0)
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(3000)
        .find('tbody')
        .contains('iaAovck4gd');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('FdywxMK1H4');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(1)
        .contains('Rrx6JNxt00');

      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(0)
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(3000)
        .find('tbody')
        .contains('iaAovck4gd');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(1)
        .contains('FdywxMK1H4');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('Rrx6JNxt00');
    });

    it('can sort by artist', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('th')
        .eq(1)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('AAAAAAA1')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('AAAAAAA1');

      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(1)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('ZZZZZZZ1')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('ZZZZZZZ1');
    });

    it('can sort by album', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('th')
        .eq(2)
        .click();
      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(2)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('ZZZZZZZ2')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('ZZZZZZZ2');

      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(2)
        .click();
      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(2)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('AAAAAAA2')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('AAAAAAA2');
    });

    it('can sort by genre ', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('th')
        .eq(3)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('iaAovck4gd')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('FdywxMK1H4');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(1)
        .contains('Rrx6JNxt00');

      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(3)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('iaAovck4gd')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(1)
        .contains('FdywxMK1H4');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('Rrx6JNxt00');
    });

    it('can sort by rating', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click();

      cy.get('[data-component="DataTable"]')
        .wait(2000)
        .find('th')
        .eq(4)
        .click();
      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(4)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .wait(2000);
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .find('tr')
        .eq(0)
        .contains('FdywxMK1H4');
    });
  });
});
