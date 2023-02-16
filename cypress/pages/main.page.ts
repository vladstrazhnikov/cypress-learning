export class MainPage {
    get clickElementsButton(): this {
        cy.get('.card:first-of-type').click();
        return this;
    }

    get clickTextBoxButton(): this {
        cy.get('.element-group:first-of-type #item-0').click();
        return this;
    }
}