# Backend CheckList:

- [x] Setup Environment

  - [x] webpack
  - [x] babel
  - [x] basic express app
  - [x] setup mongodb

- [x] Error handling

  - [x] Global error handling
  - [x] get rid of redundant try-catch using middleware

- [ ] User functionality

  - [x] User model

    - [x] Schema definition
    - [x] hash password with bcrypt
    - [x] generate JWT and send back to user

  - [ ] routers and CRUD APIs

    - [x] GET / list all users
    - [x] POST / create a user
    - [x] GET /:id get a single user
    - [x] PUI /:id update profile of user
    - [x] DELETE /:id delete specific user
    - [x] data validation
    - [ ]

  - [ ] Authentication

    - [x] Auth route & Auth controller
    - [x] Sign in
      - [x] check password
    - [ ] Sign out

  - [ ] Authorization
    - [ ] protect user route

- [ ] Extract All DB Implementation details into a single place in case DB system gets changed in the future.
  - [ ]
