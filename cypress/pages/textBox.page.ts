export class TextBoxPage {
    public get fullNameField(): Cypress.Chainable {
        return cy.get('#userName');
    }

    public get emailField(): Cypress.Chainable {
        return cy.get('#userEmail');
    }

    public get currentAddressField(): Cypress.Chainable {
        return cy.get('#currentAddress');
    }

    public get permanentAddressField(): Cypress.Chainable {
        return cy.get('#permanentAddress');
    }

    public get clickSubmitButton(): this {
        cy.get('#submit').click();
        return this;
    }

    public get nameText(): Cypress.Chainable {
        return cy.get('#name');
    }

    public get emailText(): Cypress.Chainable {
        return cy.get('#email');
    }

    public get currentAddressText(): Cypress.Chainable {
        return cy.get('#output #currentAddress');
    }

    public get permanentAddressText(): Cypress.Chainable {
        return cy.get('#output #permanentAddress');
    }

    fillFields(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        this.fullNameField.type(fullName);
        this.emailField.click().type(email);
        this.currentAddressField.type(currentAddress);
        this.permanentAddressField.type(permanentAddress);
    }
}