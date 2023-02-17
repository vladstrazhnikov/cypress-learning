export class RadioButtonPage {
    public get impressiveRadioButton(): Cypress.Chainable {
        return cy.get(':nth-child(3) .custom-control-label');
    }
    
    public get noRadioButton(): Cypress.Chainable {
        return cy.get('#noRadio');
    }

    public get selectedTextRadioButton(): Cypress.Chainable{
        return cy.get('.text-success');
    }

    getTextSuccess (text: string){
        this.selectedTextRadioButton.parent().contains(text);
    }
}