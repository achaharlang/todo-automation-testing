describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('logs in with valid credentials', () => {
    cy.get('input[name="email"]').type('alireza@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Todo List').should('be.visible');
  });

  it('shows error on invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });
});

