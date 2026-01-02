describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have sidebar navigation links', () => {
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Users').should('be.visible')
    cy.contains('Posts').should('be.visible')
    cy.contains('Comments').should('be.visible')
    cy.contains('Todos').should('be.visible')
  })

  it('should navigate to Users page', () => {
    cy.get('a[href="/users"]').click()
    cy.url().should('include', '/users')
    cy.contains('Users').should('be.visible')
  })

  it('should navigate to Posts page', () => {
    cy.get('a[href="/posts"]').click()
    cy.url().should('include', '/posts')
    cy.contains('Posts').should('be.visible')
  })

  it('should navigate to Comments page', () => {
    cy.get('a[href="/comments"]').click()
    cy.url().should('include', '/comments')
    cy.contains('Comments').should('be.visible')
  })

  it('should navigate to Todos page', () => {
    cy.get('a[href="/todos"]').click()
    cy.url().should('include', '/todos')
    cy.contains('Todos').should('be.visible')
  })

  it('should navigate back to Dashboard', () => {
    cy.get('a[href="/users"]').click()
    cy.get('a[href="/"]').first().click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should highlight active navigation link', () => {
    cy.get('a[href="/users"]').click()
    cy.get('a[href="/users"]').should('have.class', 'bg-blue-600')
  })
})
