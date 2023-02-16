import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getbyItem(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}