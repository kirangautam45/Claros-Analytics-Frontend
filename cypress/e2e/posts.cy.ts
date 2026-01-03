describe('Posts Page', () => {
  beforeEach(() => {
    cy.visit('/posts')
  })

  it('should display posts page', () => {
    cy.contains('Posts').should('be.visible')
  })

  it('should display posts table after loading', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should have search functionality', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).should('be.visible')
  })

  it('should filter posts when searching', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).type('qui est esse')
    cy.get('tbody tr', { timeout: 5000 }).should('have.length.at.least', 1)
  })

  it('should have pagination controls', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.contains('Showing').should('be.visible')
  })

  it('should navigate between pages', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.get('button').contains('2').click()
    cy.url().should('include', '/posts')
  })

  it('should change items per page', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.get('select').first().select('25')
    cy.get('tbody tr').should('have.length.at.most', 25)
  })
})
