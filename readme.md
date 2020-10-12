∏# Backend CheckList:

- [x] Setup Environment

  - [x] webpack
  - [x] babel
  - [x] basic express app
  - [x] setup mongodb

- [ ] Error handling

  - [ ] Global error handling
  - [ ] get rid of redundant try-catch using middleware

- [ ] User functionality

  - [ ] User model

    - [x] Schema definition
    - [x] hash password with bcrypt
    - [x] generate JWT and send back to user

  - [ ] routers and CRUD APIs

    - [x] GET / list all users
    - [x] POST / create a user
    - [x] GET /:id get a single user
    - [x] PUI /:id update profile of user
    - [x] DELETE /:id delete specific user
    - [ ] data validation

  - [ ] Authentication

    - [ ] Auth route & Auth controller
    - [ ] Sign in
      - [ ] check password
    - [ ] Sign out

  - [ ] Authorization
    - [ ] protect user route
