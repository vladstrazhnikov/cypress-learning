import { TextBoxPage } from "../pages/textBox.page";
import { user } from "../fixtures/user";
import { MainPage } from "../pages/main.page";
import { CheckboxPage } from "../pages/checkbox.page";

describe('Elements', () => {
  const textBoxPage = new TextBoxPage();
  const mainPage = new MainPage();
  const checkboxPage = new CheckboxPage();

  beforeEach(() => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/')
  });

  it('Textbox', () => {
    cy.log('Navigate to textbox page');
    mainPage.clickElementsButton;
    mainPage.clickTextBoxButton;
    cy.log('Fill in required fields (Full name and email)');
    textBoxPage.fillFields(user.fullName, user.email, user.currentAddress, user.permanentAddress);
    textBoxPage.clickSubmitButton;
    cy.log('Verify all input data');
    textBoxPage.nameText.contains('Name:' + user.fullName).should('be.visible');
    textBoxPage.emailText.contains('Email:' + user.email).should('be.visible');
    textBoxPage.currentAddressText.contains('Current Address :' + user.currentAddress).should('be.visible');
    textBoxPage.permanentAddressText.contains('Permananet Address :' + user.permanentAddress).should('be.visible');
  });

  it('Checkbox', () => {
    cy.log('Navigate to checkbox page');
    mainPage.clickElementsButton;
    mainPage.clickCheckBoxButton;
    cy.log('Expand all checkboxes');
    checkboxPage.expandAllButton;
    cy.log('Check 5 random checkboxes');
    checkboxPage.checkboxesList.then($items => {
      return Cypress._.sampleSize($items.toArray(), 5);
    }).click({ multiple: true });
    cy.log('Store selected text');
    let selectedText;
    cy.get(checkboxPage.selectedText).then(($els) => {
      selectedText = Array.from($els, (el) => el.innerText);
    });
    cy.log('Verify selected checkboxes');
    cy.get(checkboxPage.checkedCheckboxes).then(($rows) => {
      let text = $rows.text().toLowerCase();
      for (let key in selectedText) {
        cy.wrap(text[key]).contains(selectedText[key])
      }
    });
  });
})