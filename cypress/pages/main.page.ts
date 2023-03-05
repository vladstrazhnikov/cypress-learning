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

    get clickRadioButtonButton(): this {
        cy.getbyItem('2').click();
        return this;
    }

    get clickButtonsButton(): this {
        cy.getbyItem('4').click();
        return this;
    }

    get clickLinksButton(): this {
        cy.getbyItem('5').click();
        return this;
    }

    get clickBrokenLinksButton(): this {
        cy.getbyItem('6').click();
        return this;
    }
}