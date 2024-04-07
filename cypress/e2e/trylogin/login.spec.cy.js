// let details
// let data
describe('Login Journey', () => {
    beforeEach(() => {
        cy.Login()
    })
    it('set PIN', () => {
        cy.contains('Set  up your PIN').should('not.exist');
    })
    it('verify Number', () => {
        cy.contains('We are learning').should('not.exist');
    })
})