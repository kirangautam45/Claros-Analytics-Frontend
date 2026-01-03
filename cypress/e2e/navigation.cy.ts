describe('Navigation', () => {
  beforeEach(() => {
    // Set viewport to desktop size so sidebar is visible
    cy.viewport(1280, 720)
    cy.visit('/')
    // Wait for the app to load
    cy.contains('Analytics Dashboard', { timeout: 10000 }).should('exist')
  })

  it('should have sidebar navigation links', () => {
    cy.contains('Dashboard').should('exist')
    cy.contains('Users').should('exist')
    cy.contains('Posts').should('exist')
    cy.contains('Comments').should('exist')
    cy.contains('Todos').should('exist')
  })

  it('should navigate to Users page', () => {
    cy.get('a[href="/users"]').click()
    cy.url().should('include', '/users')
  })

  it('should navigate to Posts page', () => {
    cy.get('a[href="/posts"]').click()
    cy.url().should('include', '/posts')
  })

  it('should navigate to Comments page', () => {
    cy.get('a[href="/comments"]').click()
    cy.url().should('include', '/comments')
  })

  it('should navigate to Todos page', () => {
    cy.get('a[href="/todos"]').click()
    cy.url().should('include', '/todos')
  })

  it('should navigate back to Dashboard', () => {
    cy.get('a[href="/users"]').click()
    cy.get('a[href="/"]').first().click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should highlight active navigation link', () => {
    cy.get('a[href="/users"]').click()
    // Active links have the cyan gradient class
    cy.get('a[href="/users"]').should('have.class', 'from-cyan-500')
  })
})
