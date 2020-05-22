# Back-End
Back end server created using node js, express, and knex.

Register:

POST -address-/auth/register
Takes in a User object
    {
        Username: -name-,
        Password: -password-,
        Email: -email-,
        Account: -(Editor or Subsciber)-
    }

Returns an object with Username and Account
    {
        Username: -name-,
        Account: -account-
    }


Login:

POST -address-/auth/login

Takes in an object
    {
        Username: -name-,
        Password: -password-
    }
Returns and object with user id and a token
    {
        id: -id-,
        token: -token-
    }


