describe('Todo App Automation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(500);

    // Login
    cy.get('input[placeholder="Enter your email"]').type('automationtest');cy.wait(500);
    cy.get('input[placeholder="Enter your password"]').type('P@ssword1234');cy.wait(500);    
    cy.contains('button', 'Login').click();cy.wait(500);
    

    // Wait for redirection and dashboard load
    cy.contains('Todo List', { timeout: 10000 }).should('be.visible');cy.wait(500);
    
  });

  it('logs in with valid credentials', () => {
    // Login already tested in beforeEach
    cy.contains('Todo List').should('be.visible');cy.wait(500);
  });

  it('creates a new todo item', () => {
    const newTask = 'Test new task';
    
      
    
    cy.get('input[placeholder="Please insert new task"]').type(newTask);cy.wait(500);
    cy.contains('button', 'Add Task').click();

    cy.contains('li', newTask).should('exist');cy.wait(500);
  });

  it('edits an existing todo item', () => {
    const editedTask = 'Edited task';

    cy.get('button').contains('Edit').first().click();cy.wait(500);
    cy.get('input[type="text"]').clear().type(editedTask);cy.wait(500);
    cy.contains('button', 'Save').click();cy.wait(500);

    cy.contains('li', editedTask).should('exist');cy.wait(500);
  });

  it('deletes a todo item', () => {
    cy.get('ul li').then(itemsBefore => {
      cy.get('button').contains('Delete').first().click();cy.wait(500);

      cy.get('ul li').should('have.length', itemsBefore.length - 1);cy.wait(500);
    });
  });

  it('shows error on invalid credentials', () => {
    // Separate context needed, so logout and test separately
    cy.visit('http://localhost:3000');cy.wait(500);
    cy.get('input[placeholder="Enter your email"]').type('wrong@example.com');cy.wait(500);
    cy.get('input[placeholder="Enter your password"]').type('wrongpass');cy.wait(500);
    cy.contains('button', 'Login').click();cy.wait(500);

    cy.contains('Invalid credentials').should('be.visible');cy.wait(500);
  });
  
});

