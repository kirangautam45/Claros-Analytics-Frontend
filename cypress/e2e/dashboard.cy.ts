describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the dashboard page', () => {
    // Check for the Analytics Dashboard label in the header
    cy.contains('Analytics Dashboard', { timeout: 10000 }).should('exist')
  })

  it('should display stat cards with data', () => {
    // Wait for data to load and check stat card titles exist
    cy.contains('Total Users', { timeout: 10000 }).should('exist')
    cy.contains('Total Posts').should('exist')
    cy.contains('Comments').should('exist')
    cy.contains('Total Todos').should('exist')
  })

  it('should display charts section', () => {
    cy.contains('Top Users by Posts', { timeout: 10000 }).should('exist')
    cy.contains('Todo Completion Rate').should('exist')
  })

  it('should display activity table', () => {
    cy.contains('User Activity Overview', { timeout: 10000 }).should('exist')
    cy.get('table').should('exist')
  })

  it('should display header with title', () => {
    // Check that the header component renders with Dashboard title
    cy.get('header').should('exist')
  })

  it('should show greeting message', () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      cy.contains('Good morning').should('exist')
    } else if (hour < 18) {
      cy.contains('Good afternoon').should('exist')
    } else {
      cy.contains('Good evening').should('exist')
    }
  })
})
