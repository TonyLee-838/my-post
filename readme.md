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

  - [ ] routers and APIs

    - [x] GET / list all users
    - [x] POST / create a user
    - [x] GET /:id get a single user
    - [x] PUI /:id update profile of user
    - [x] DELETE /:id delete specific user
    - [x] data validation

  - [ ] Authentication

    - [x] Auth route & Auth controller
    - [x] Sign in
      - [x] check password
    - [ ] Sign out


- [x] Extract All DB Implementation details into a single place in case DB system gets changed in the future.

- [x] Post API
  - [x] GET / list all post
  - [x] POST / create a post
  - [x] GET /:id get a single post
  - [x] PUI /:id update post
  - [x] DELETE /:id delete specific post
  - [x] data validation

- [x] markdown file convertor

- [ ] Authorization
  - [x] protect user route
  - [x] only allow admin to manage all the posts.
  - [ ] allow author edit his/her own page.