describe('My example test', () => {
  context('Search input', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('can type text in search bar', () => {
      cy.get('[data-component="SearchField"]')
        .find('input')
        .type('I am typing. Reeeeee')
        .should('have.value', 'I am typing. Reeeeee');
    });
  });
});
