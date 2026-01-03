describe('Posts Page', () => {
  beforeEach(() => {
    cy.visit('/posts')
    // Wait for page to load
    cy.get('table', { timeout: 15000 }).should('exist')
  })

  it('should display posts page', () => {
    cy.contains('Posts').should('exist')
  })

  it('should display posts table after loading', () => {
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should have search functionality', () => {
    cy.get('input[placeholder*="Search"]').should('exist')
  })

  it('should filter posts when searching', () => {
    cy.get('input[placeholder*="Search"]').type('qui est esse')
    cy.get('tbody tr', { timeout: 5000 }).should('have.length.at.least', 1)
  })

  it('should have pagination controls', () => {
    cy.contains('Showing').should('exist')
  })

  it('should navigate between pages', () => {
    cy.get('button').contains('2').click()
    cy.url().should('include', '/posts')
  })

  it('should change items per page', () => {
    cy.get('select').first().select('25')
    cy.get('tbody tr').should('have.length.at.most', 25)
  })
})
