import {faker } from '@faker-js/faker'
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

Cypress.Commands.add('uniquePhoneNumber', () => { 
    cy.get(data.basicDetailsPage.bizPhoneNum).should('exist').fill(faker.phone.number('+23481#######'))
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

Cypress.Commands.add('insertOTP', () => {     
    cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true).then(email => {
        const emailBody = email.body
        const parser = new DOMParser()
        const doc = parser.parseFromString(emailBody, "text/html")
        const code = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3)').textContent
        const otp = code.trim()
        cy.get(data.otpPage.inputBox).each(($el, index) => {
          cy.wrap($el).should('be.visible').type(otp[index])
        })
      }))
})

Cypress.Commands.add('typeAText', (field, text) => { 
    cy.get(field).should('be.visible').and('exist').fill(text)
})

Cypress.Commands.add('verifyOtpPage', () => { 
    cy.get(data.otpPage.otpVerification).should('be.visible').and('have.text', 'Please enter the code below')
})

Cypress.Commands.add('heardAboutUs', (element) => { 
    cy.get(data.otherDetailsPage.heardAboutUs).should('be.visible').and('exist').click()
    cy.get(data.otherDetailsPage.aboutUsList).contains(element).should('exist').click()
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