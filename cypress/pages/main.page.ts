export class MainPage {
    get clickElementsButton(): this {
        cy.get('.card:first-of-type').click();
        return this;
    }

    get clickTextBoxButton(): this {
        cy.getbyItem('0').click();
        return this;
    }

    get clickCheckBoxButton(): this {
        cy.getbyItem('1').click();
        return this;
    }
}