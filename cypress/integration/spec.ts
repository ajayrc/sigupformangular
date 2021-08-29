describe('Sign up user form', () => { // todo make a page object
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Sign Up');
  });

  it('fills the form fields and presses submit', () => {
    cy.intercept( // mocking the async validator
      {
        method: 'GET',
        url: 'https://isitarealemail.com/api/email/validate*',
      },
      {
        body: {status: 'valid'},
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    ).as('asyncEmailValidationRequest');

    cy.visit('/');

    cy.get('#signupForm_firstName').type('first name');
    cy.get('#signupForm_lastName').type('last name');
    cy.get('#signupForm_email').type('ajayrc@gmail.com');
    cy.get('#signupForm_password').type('asdfgASDFG');

    cy.wait('@asyncEmailValidationRequest');

    cy.get('#signupForm_submitButton').click();
    
    cy.url().should('include', 'profile');
    
    cy.contains('Welcome! Your client id is');
  });

})
