describe('Users Page', () => {
  beforeEach(() => {
    cy.visit('/users')
    // Wait for page to load
    cy.get('table', { timeout: 15000 }).should('exist')
  })

  it('should display users page title', () => {
    cy.contains('Users').should('exist')
  })

  it('should display users table after loading', () => {
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should display user information in table', () => {
    cy.contains('Name').should('exist')
    cy.contains('Username').should('exist')
    cy.contains('Email').should('exist')
  })

  it('should have a search input', () => {
    cy.get('input[placeholder*="Search"]').should('exist')
  })

  it('should filter users when searching', () => {
    cy.get('input[placeholder*="Search"]').type('Leanne')
    cy.get('tbody tr').should('have.length.at.least', 1)
    cy.contains('Leanne').should('exist')
  })

  it('should show no results for invalid search', () => {
    cy.get('input[placeholder*="Search"]').type('xyznonexistent123')
    cy.contains('No users found').should('exist')
  })

  it('should clear search and show all users', () => {
    cy.get('input[placeholder*="Search"]').type('Leanne')
    cy.get('input[placeholder*="Search"]').clear()
    cy.get('tbody tr').should('have.length.at.least', 5)
  })

  it('should display user count', () => {
    cy.contains('users', { timeout: 10000 }).should('exist')
  })
})
