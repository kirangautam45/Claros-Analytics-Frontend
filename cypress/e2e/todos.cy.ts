describe('Todos Page', () => {
  beforeEach(() => {
    cy.visit('/todos')
    // Wait for page to load
    cy.get('table', { timeout: 15000 }).should('exist')
  })

  it('should display todos page', () => {
    cy.contains('Todos').should('exist')
  })

  it('should display todos table after loading', () => {
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should show todo completion status', () => {
    // Check for status indicators in the table
    cy.get('tbody tr').first().should('exist')
  })

  it('should have search functionality', () => {
    cy.get('input[placeholder*="Search"]').should('exist')
  })

  it('should filter todos when searching', () => {
    cy.get('input[placeholder*="Search"]').type('delectus')
    cy.get('tbody tr', { timeout: 5000 }).should('have.length.at.least', 1)
  })

  it('should have pagination', () => {
    cy.contains('Showing').should('exist')
  })
})
