Feature: SignUp Journey and Scenario

    As a new user, I should be able to
    signup successfully

    Scenario Outline:  Successful Registration with valid credentials choosing <option>.
        Given I click "Sign up" Button
        When I fill in the "fullname" with data "Mercy Aigbe"
        And I fill in the "businessname" with data "Mercy"
        And I insert the business email
        And I insert a unique phone number
        And I fill in the "businessRegNum" with data "RC-7878"
        And I click "Next" Button
        And I select "<option>" as how I heard about mima
        And I fill in the "password" with data "Test@1234"
        And I click "Sign Up" Button
        Then I should see the OTP page
        When I insert the OTP
        Then I should see the following on the dashboard
            | sidebar              |
            | Home                 |
            | Customer             |
            | Invoice & Accounting |
            | Orders               |
            | Payment Link         |
            | Booking              |
            | Paybills             |

        Examples:
            | option    |
            | Instagram |
            | Facebook  |
            | Twitter   |

    