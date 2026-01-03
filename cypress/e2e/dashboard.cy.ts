describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the dashboard page', () => {
    cy.contains('Dashboard').should('be.visible')
  })

  it('should display stat cards with data', () => {
    cy.get('[class*="StatCard"]', { timeout: 10000 }).should('have.length.at.least', 1)
    cy.contains('Total Users').should('be.visible')
    cy.contains('Total Posts').should('be.visible')
    cy.contains('Comments').should('be.visible')
    cy.contains('Total Todos').should('be.visible')
  })

  it('should display charts section', () => {
    cy.contains('Top Users by Posts', { timeout: 10000 }).should('be.visible')
    cy.contains('Todo Completion Rate').should('be.visible')
  })

  it('should display activity table', () => {
    cy.contains('User Activity Overview', { timeout: 10000 }).should('be.visible')
    cy.get('table').should('be.visible')
  })

  it('should have refresh button in header', () => {
    cy.contains('Refresh').should('be.visible')
  })

  it('should show greeting message', () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      cy.contains('Good morning').should('be.visible')
    } else if (hour < 18) {
      cy.contains('Good afternoon').should('be.visible')
    } else {
      cy.contains('Good evening').should('be.visible')
    }
  })
})
