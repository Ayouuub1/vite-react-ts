describe('Should test edit rates', () => {

    beforeEach(() => {
        cy.visit('/');
      });

      it('devrait afficher le formulaire de modification et modifier la note', () => {
          cy.visit('/'),
          cy.get('input[name="title"]').type('Titre de la note');
          cy.get('input[name="rate"]').type('5');
          cy.get('input[name="comment"]').type('Ceci est un commentaire de test');
          cy.get('button[type="submit"]').click();
          cy.get('.notes-list-table tbody tr').first().find('.icon').first().click();
          cy.get('.note-edit-form').should('exist');
          cy.get('.note-edit-form input[name="title"]').clear().type('Nouveau titre de la note');
          cy.get('.note-edit-form input[name="rate"]').clear().type('4');
          cy.get('.note-edit-form input[name="comment"]').clear().type('Nouveau commentaire de la note');
          cy.get('.note-edit-form button[type="submit"]').click();
      });
    
})