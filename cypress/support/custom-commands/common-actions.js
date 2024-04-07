let details
let data
let inboxId
let emailAddress

before(() => {
    cy.fixture('creds').then(cred => {
        details = cred
    })
    cy.fixture('selectors').then(sel=>{
        data = sel
    })
})

Cypress.Commands.add('clickSpecifiedElement', (element) => { 
    cy.contains(element).should('be.visible').and('exist').click()
})

Cypress.Commands.add('insertEmail', () => {     
    cy.mailslurp().then(mailslurp => mailslurp.createInbox().then(inbox => {
    inboxId = inbox.id
    emailAddress = inbox.emailAddress
    cy.get(data.basicDetailsPage.bizEmailField).fill(emailAddress)

    const userDetails = `
              {
                "email": "${emailAddress}",
                "password": "Test1234@"
              }
    `
    cy.writeFile('cypress/fixtures/creds.json', userDetails)
  }))
})

Cypress.Commands.add('typeAText', (field, text) => { 
    cy.get(field).should('be.visible').and('exist').fill(text)
})

Cypress.Commands.add('insertDetails', (string) => { 
    switch(string){
        case 'username':
            cy.typeAText(data.basicDetailsPage.fullnameField, 'Eniola Badmus')
            break
        case 'business name':
            cy.typeAText(data.basicDetailsPage.bizNameField, 'Azeez')
            break
        case 'business reg number':
            cy.typeAText(data.basicDetailsPage.bizRegNum, 'RC-777')
    }
})

Cypress.Commands.add('fillDetails', (field, text) => { 
    cy.get(`#${field}`).should('be.visible').and('exist').fill(text)
})

Cypress.Commands.add('Login', ()=>{
    cy.clickSpecifiedElement('Log in')
    cy.typeAText(data.otherDetailsPage.emailField,details.email)
    cy.typeAText(data.otherDetailsPage.passwordField,details.password)
    cy.clickSpecifiedElement('Login')
    cy.contains('Select a Plan').should('be.visible')
})