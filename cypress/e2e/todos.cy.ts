describe('Todos Page', () => {
  beforeEach(() => {
    cy.visit('/todos')
  })

  it('should display todos page', () => {
    cy.contains('Todos').should('be.visible')
  })

  it('should display todos table after loading', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should show todo completion status', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    // Check for status badges (completed or pending)
    cy.get('tbody').should('contain.text', 'Completed').or('contain.text', 'Pending')
  })

  it('should have search functionality', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).should('be.visible')
  })

  it('should filter todos when searching', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).type('delectus')
    cy.get('tbody tr', { timeout: 5000 }).should('have.length.at.least', 1)
  })

  it('should have pagination', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.contains('Showing').should('be.visible')
  })
})
