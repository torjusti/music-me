describe('Testing filtering in database', () => {
  before(() => {
    cy.visit('http://localhost:3000/');

    // Adding a test song
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
      .click()
      .wait(2000);

    cy.get('[data-component="AddEditButton"]').click();

    cy.get('[data-component="AddEditForm"]')
      .find('form')
      .find('.star')
      .eq(1)
      .click();
    cy.get('[data-component="AddEditForm"]')
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

  context('Testing filtering on genre and rating', () => {
    it('can filter on rating', () => {
      cy.get('[data-component="SidePanel"]')
        .find('button')
        .contains('Enable filter by rating')
        .click();
      cy.get('[data-component="SidePanel"]')
        .find('span')
        .contains(3)
        .click();

      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('FdywxMK1H4');
    });

    it('can filter on one genre', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Rock$/)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('Rrx6JNxt00');
    });

    it('can filter on multiple genres', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Rock$/)
        .click();
      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Pop$/)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('Rrx6JNxt00');
      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('FdywxMK1H4');
    });

    it('can filter on both', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Pop$/)
        .click();

      cy.get('[data-component="SidePanel"]')
        .find('button')
        .contains('Enable filter by rating')
        .click();
      cy.get('[data-component="SidePanel"]')
        .find('span')
        .contains(3)
        .click();

      cy.get('[data-component="DataTable"]')
        .find('tbody')
        .contains('FdywxMK1H4');
    });

    it('can filter, search and sort at the same time', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('iaAovck4gd');
      cy.get('button')
        .contains('Search')
        .click()
        .wait(2000);

      cy.get('[data-component="DataTable"]')
        .find('th')
        .eq(2)
        .click();

      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Rock$/)
        .click();
      cy.get('[data-component="SidePanel"]')
        .find('li')
        .contains(/^Pop$/)
        .click();

      cy.get('[data-component="SidePanel"]')
        .find('button')
        .contains('Enable filter by rating')
        .click();
      cy.get('[data-component="SidePanel"]')
        .find('span')
        .contains(2)
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
  });
});
