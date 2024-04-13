const { faker } = require("@faker-js/faker")
let data
let details
let basic
let other
let iden
let inboxId
let emailAddress

before(() => {
    cy.fixture('selectors').then(sel => {
        data = sel
        basic = data.basicDetailsPage
        other = data.otherDetailsPage
        iden = data.otpPage
    })
    cy.fixture('creds').then(cred => {
        details = cred
    })

})

Cypress.Commands.add('clickSpecifiedElement', (element) => {
    cy.contains(element).should('be.visible').and('exist').click()
})

Cypress.Commands.add('clickGivenElement', (element) => {
    cy.get(element).click()
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
        cy.get(iden.inputBox).each(($el, index) => {
            cy.wrap($el).should('be.visible').type(otp[index])
        })
    }))
})

Cypress.Commands.add('insertNumber', () => {
        cy.get(basic.bizPhoneNum).fill(faker.phone.number('+23480########'))
    })

Cypress.Commands.add('typeAText', (field, text) => {
        cy.get(field).should('be.visible').and('exist').fill(text)
    })

Cypress.Commands.add('insertDetails', (string) => {
        switch (string) {
            case 'fullname':
                cy.typeAText(data.basicDetailsPage.fullnameField, 'Ololade Dollars')
                break
            case 'businessname':
                cy.typeAText(data.basicDetailsPage.bizNameField, 'MrDollars')
                break
            case 'businessRegNum':
                cy.typeAText(data.basicDetailsPage.bizRegNum, 'RC-008')
        }
    })

Cypress.Commands.add('fillDetails', (field, text) => {
        cy.get(`#${field}`).should('be.visible').and('exist').fill(text)
    })

Cypress.Commands.add('Login', () => {
        cy.clickSpecifiedElement('Log in')
        cy.typeAText(data.otherDetailsPage.emailField, details.email)
        cy.typeAText(data.otherDetailsPage.passwordField, details.password)
        cy.clickSpecifiedElement('Login')
        cy.contains('Select a Plan').should('be.visible')
    })