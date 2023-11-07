const baseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:3000'

describe('CRA', () => {
  it('shows learn link', function () {
    cy.visit(baseUrl)
    cy.get('.App-link')
      .should('be.visible')
      .and('have.text', 'React App Example 🚀')
  })
})
