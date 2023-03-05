import { TextBoxPage } from "../pages/textBox.page";
import { user } from "../fixtures/user";
import { MainPage } from "../pages/main.page";
import { CheckboxPage } from "../pages/checkbox.page";
import { RadioButtonPage } from "../pages/radioButton.page";

describe('Elements', () => {
  const textBoxPage = new TextBoxPage();
  const mainPage = new MainPage();
  const checkboxPage = new CheckboxPage();
  const radioButtonPage = new RadioButtonPage();

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
    })
  });

  it('Radio button', () => {
    let text = 'You have selected Impressive';
    let textColour = 'rgb(40, 167, 69)';
    cy.log('Navigate to radio button page');
    mainPage.clickElementsButton;
    mainPage.clickRadioButtonButton;
    radioButtonPage.impressiveRadioButton.click();
    radioButtonPage.getTextSuccess(text);
    radioButtonPage.selectedTextRadioButton.should('have.css', 'color', textColour);
    radioButtonPage.noRadioButton.should('be.disabled');
  });

  it('Buttons', () => {
    cy.log('Navigate to radio button page');
    mainPage.clickElementsButton;
    mainPage.clickButtonsButton;
    cy.get('#doubleClickBtn').dblclick();
    cy.get('#doubleClickMessage').should('be.visible').contains('You have done a double click');
    cy.get('#rightClickBtn').rightclick()
    cy.get('#rightClickMessage').should('be.visible').contains('You have done a right click');
    cy.get('#kPLKM').click()
    cy.get('#dynamicClickMessage').should('be.visible').contains('You have done a dynamic click');
  });

  it('Links', () => {
    cy.log('Navigate to radio button page');
    mainPage.clickElementsButton;
    mainPage.clickLinksButton;
    cy.intercept('/created', (req) => {
      console.log(req.headers);
    }).as('created');
    cy.get('#created').click();
    // cy.wait('@created').should(({ response }) => {
    //   expect(response.statusCode).to.eq(201);
    // }); 
    cy.wait('@created').its('response.statusCode').should('eq', 201);
  });

  it.only('broken image - links', () => {
    cy.log('Navigate to radio button page');
    mainPage.clickElementsButton;
    mainPage.clickBrokenLinksButton;

    cy.log('Verify that image is displayed')
    // cy.get('.row img:last-of-type')
    //   .should('be.visible')
    //   .and('have.prop', 'naturalWidth')
    //   .should('be.greaterThan', 0);
  // });

  cy.log('Verify that links is displayed')
  // const links = cy.get('.row a');
  cy.get('.row a').invoke('attr', 'href').then((hrefs) => {
    // Log the array of hrefs to the console
    console.log(hrefs);
  });
  // Select all links on the page
  cy.get('a').each(($el) => {
    // Get the href attribute of each link
    const href = $el.prop('href');
    // Skip links without an href attribute
    if (!href) {
      return;
    }
    // Send an HTTP request to the link and check the status code
    cy.request(href).then((resp) => {
      expect(resp.status).to.equal(200);
    });
  });
    
  });
});