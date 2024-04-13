import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'
const { faker } = require("@faker-js/faker")
let data
let details
let basic
let other
let iden
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


Given(/^I click "([^"]*)" Button$/, (element) => {
	cy.clickSpecifiedElement(element)
});

When(/^I insert the business email$/, () => {
	cy.insertEmail()
});

When(/^I insert a unique phone number$/, () => {
	cy.uniquePhoneNumber()
});

When(/^I select "([^"]*)" as how I heard about mima$/, (text) => {
	cy.heardAboutUs(text)
});

Then(/^I should see the OTP page$/, () => {
	cy.verifyOtpPage()
});

When(/^I insert the OTP$/, () => {
	cy.insertOTP()
});

Then(/^I should see the following on the dashboard$/, (datatable) => {
	datatable.hashes().forEach((row)=>{
    cy.contains(row.sidebar).should('exist').and('contain', row.sidebar)
  })
});


When(/^I fill in the "([^"]*)"$/, (args1) => {
	cy.insertDetails(args1)
});


When(/^I fill in the "([^"]*)" with data "([^"]*)"$/, (args1,args2) => {
	cy.fillDetails(args1,args2);
	
});









// const { faker } = require("@faker-js/faker")
// let data
// let details
// let basic
// let other
// let iden
// let inboxId
// let emailAddress
// describe('Sign Up Journey', () => {
  // beforeEach(() => {
  //   cy.fixture('selectors').then(sel => {
  //     data = sel
  //     basic = data.basicDetailsPage
  //     other = data.otherDetailsPage
  //     iden = data.otpPage
  //   })
  //   cy.fixture('creds').then(cred => {
  //     details = cred
  //   })

  // })
//   it('A successful sign up with all fields filled', () => {
//     cy.contains('Sign up').should('be.visible').click()
//     cy.get(basic.fullnameField).should('be.visible').fill('Osman Shire')
//     cy.get(basic.bizNameField).fill('Eniola')
    // cy.mailslurp().then(mailslurp => mailslurp.createInbox().then(inbox => {
    //   inboxId = inbox.id
    //   emailAddress = inbox.emailAddress
    //   cy.get(basic.bizEmailField).fill(emailAddress)

    //   const userDetails = `
    //             {
    //               "email": "${emailAddress}",
    //               "password": "Test1234@"
    //             }
    //   `
    //   cy.writeFile('cypress/fixtures/creds.json', userDetails)
    // }))
//     cy.get(basic.bizPhoneNum).fill(faker.phone.number('+23480########'))
//     cy.get(basic.bizRegNum).fill('RC-0987')
//     cy.contains('Next').click()
//     cy.get(other.WebField).should('be.visible').fill('https://www.osmanshire.org')
//     cy.get(other.InsField).fill('@osmanshire')
//     cy.get(other.TwtField).fill('@osmanshire')
//     cy.get(other.heardAboutUs).click()
//     cy.contains('Google Search').should('be.visible').click()
//     cy.get(other.passwordField).fill('Test1234@')
//     cy.contains('Sign Up').click()
    // cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true).then(email => {
    //   const emailBody = email.body
    //   const parser = new DOMParser()
    //   const doc = parser.parseFromString(emailBody, "text/html")
    //   const code = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3)').textContent
    //   const otp = code.trim()
    //   cy.get(iden.inputBox).each(($el, index) => {
    //     cy.wrap($el).should('be.visible').type(otp[index])
    //   })
    // }))
//   cy.contains('Select a Plan').should('be.visible')
//   })
// })