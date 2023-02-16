import { TextBoxPage } from "../pages/textBox.page";
import { user } from "../fixtures/user";
import { MainPage } from "../pages/main.page";

describe('Elements', () => {
  const textBoxPage = new TextBoxPage();
  const mainPage = new MainPage();

  beforeEach(() => {
    cy.once('uncaught:exception', () => false);
    cy.visit('/')
  });

  it('Text box', () => {
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
})