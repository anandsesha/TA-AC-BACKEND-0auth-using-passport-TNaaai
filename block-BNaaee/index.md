writeCode

Q1. Create an express application using generator and implement github and google login using passport.

A single user when logs from github and google using same email, no two seperate collection should be created. Same user document should be able to accomodate both profile information.

- design userSchema to save github and google information with common email
- add logged user information into session
- implement logout

Q2. Create an express application using generator and implement email, password login using passport.

<!-- In this Asg II:

I have implemented:

1. GitHub OAuth login using passport (using strategy - passport-github)
2. Google OAuth login using passport (using strategy - passport-google-oauth2)


Both the github and google userInfo are stored in the same modeled DB. in the users document. Sessions working based on which (Github/google) we use for login

Yet to implement:
implement email, password LOCAL login using passport. (TIP - use strategy - passport-local)
 -->
