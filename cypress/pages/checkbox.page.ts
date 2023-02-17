export class CheckboxPage {
    get expandAllButton(): this {
        cy.get('.rct-option-expand-all').click();
        return this;
    }

    get checkboxesList(): Cypress.Chainable {
        return cy.get('.rct-node');
    }

    selectedText = '.text-success';
    checkedCheckboxes = 'input[type=checkbox]:checked';
}