describe('Should test edit rates', () => {

    beforeEach(() => {
        cy.visit('/');
      });

      it('devrait afficher le formulaire de modification et modifier la note', () => {
          cy.get('input[name="title"]').type('Titre de la note');
          cy.get('input[name="rate"]').type('5');
          cy.get('input[name="comment"]').type('Ceci est un commentaire de test');
          cy.get('button[type="submit"]').click();
          cy.get('.notes-list-table tbody tr').first().find('.icon-delete').first().click();
          cy.on('window:confirm', () => true);
      });
    
})