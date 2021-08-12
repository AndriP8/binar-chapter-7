# binar-chapter-7

### How to use

- <code>npm install</code>
- <code>sequelize db:create</code>
- <code>sequelize db:migrate</code>
- <code>npm run dev</code>
  not including nodemon in dependencies

### Endpoint dashboard

- Register GET = <code>/admin/register</code>
- Register POST = <code>/admin/register</code>
- Login GET = <code>/admin/signin</code>
- Login POST = <code>/admin/signin</code>
- Dashboard GET = <code>/admin/dashboard</code>
- User GET = <code>/admin/user</code>
- User POST = <code>/admin/user</code>
- Edit user GET = <code>/admin/edit/:id</code>
- Edit user POST = <code>/admin/edit/:id</code>
- Delete user delete = <code>/admin/user/:id</code>

### Endpoint API

- Register user POST = <code>/api/v1/register</code>
- Login user POST = <code>/api/v1/login</code>
- Whoami GET = <code>/api/v1/whoami</code>
- Generate room POST = <code>/api/v1/generate/:id</code>
  id is the data in the user table and is used as the value of the playerOneId attribute in the room table
- Data room GET = <code>/api/v1/generate/:id</code> id is the data in the room table
- Join room POST = <code>/api/v1/join_room</code> this endpoint updates playerTwoId based on id and taken from req.body
- Battle game POST = <code>/api/v1/fight</code>
