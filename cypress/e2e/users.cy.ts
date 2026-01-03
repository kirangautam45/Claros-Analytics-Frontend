describe('Users Page', () => {
  beforeEach(() => {
    cy.visit('/users')
  })

  it('should display users page title', () => {
    cy.contains('Users').should('be.visible')
  })

  it('should display loading state initially', () => {
    cy.contains('Loading').should('be.visible')
  })

  it('should display users table after loading', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should display user information in table', () => {
    cy.get('table', { timeout: 10000 }).should('be.visible')
    cy.contains('Name').should('be.visible')
    cy.contains('Username').should('be.visible')
    cy.contains('Email').should('be.visible')
  })

  it('should have a search input', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).should('be.visible')
  })

  it('should filter users when searching', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).type('Leanne')
    cy.get('tbody tr').should('have.length.at.least', 1)
    cy.contains('Leanne').should('be.visible')
  })

  it('should show no results for invalid search', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).type('xyznonexistent123')
    cy.contains('No users found').should('be.visible')
  })

  it('should clear search and show all users', () => {
    cy.get('input[placeholder*="Search"]', { timeout: 10000 }).type('Leanne')
    cy.get('input[placeholder*="Search"]').clear()
    cy.get('tbody tr').should('have.length.at.least', 5)
  })

  it('should display user count', () => {
    cy.contains('users found', { timeout: 10000 }).should('be.visible')
  })
})
