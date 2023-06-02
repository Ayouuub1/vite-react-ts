describe('Should test adding new rates', () => {

    it('devrait afficher le formulaire de note', () => {
        cy.visit('/'),
        cy.get('form.note-form').should('exist');
        cy.get('input[name="title"]').should('exist');
        cy.get('input[name="rate"]').should('exist');
        cy.get('input[name="comment"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('devrait soumettre le formulaire avec des champs valides', () => {
        cy.visit('/'),
        cy.get('input[name="title"]').type('Titre de la note');
        cy.get('input[name="rate"]').type('5');
        cy.get('input[name="comment"]').type('Ceci est un commentaire de test');
        cy.get('button[type="submit"]').click();
    });

    it("devrait pas soumettre le formulaire s'il manque un ou plusieurs champs", () => {
        cy.visit('/'),
        cy.get('input[name="title"]').type('Titre de la note');
        cy.get('input[name="comment"]').type('Ceci est un commentaire de test');
        cy.get('button[type="submit"]').click();
        cy.contains('Veuillez remplir tous les champs').should('be.visible');
    });
})