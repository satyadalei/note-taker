<!-- yarn init
yarn add typescript -D
yarn add express
npx tsc --init
create SRC folder in main server folder
yarn add tsc-watch -D
create script for
yarn dev ("dev":"tsc-watch")
yarn start ("start":"node ./build/index.js")

npx gitignore Node :: to create a .gitignore file for node.js project structure -->

# API End points

## User

### Create a new user

```http
  POST /api/user/createUser
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `Email`    | `string` | **Required**. |
| `Name`     | `string` | **Required**. |
| `Password` | `string` | **Required**. |

#### Response

- status : `200` (ok)
  If user sends correctly all data

```
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMxZDhhOGQ0MGRhMTQ3MWExMzMzNjEiLCJlbWFpbCI6InNhdHlhbmFyYulhbmRhbGVpMUBnbWFpbC5jb20iLCJpYXQiOjE3MDcyMDI3MjgsImV4cCI6MTcwiTc5NDcyOH0.cAlHY4D0hVGtIEFMUomq8KFIQ5J5mFtkr206Y9UJ9GY",
        "newUser": {
            "_id": "65c1d8a8d40da1471a193361",
            "name": "Satyanarayan Dalei",
            "email": "satyanarayandalei9815r32@gmail.com"
        }
    }
}
```

- status : `409` (User already exists)

```
{
    "success": false,
    "message": "User already exists",
    "data": null
}
```

- status : `400` (Incorrect credentials)

If user does not sends `email` or `password` or `name`

```
{
    "success": false,
    "message": "Invalid credentials. Please fill all the fields.",
    "data": null
}
```

## User login

```http
  POST /api/user/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email id |
| `password` | `string` | **Required** User password  |

####

### Response

- status : `200` (ok)

If User logins through valid `email` & `password`

```
{
    "success": true,
    "message": "user log in",
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI7NWMxZDhhOGQ0MGRhMTQ3MWExMzMzNjEiLCJlbWFpbCI6InNhdHlhbmFyYulhbmRhbGVpMUBnbWFpbC5jb20iLCJpYXQiOjE3MDcyMDI3MjgsImV4cCI6MTcwiTc5NDcyOH0.cAlHY4D0hVGtIEFMUomq8KFIQ5J5mFtkr206Y9UJ9GY",
        "user": {
            "email": "satyanarayandalei4572192828@gmail.com",
            "_id": "65bf9f6a846363347f2a0505",
            "name": "Satyanarayan Dalei"
        }
    }
}
```

- status : `400`

  If user _***does not***_ send `email` or `password`

```
  {
    "success": false,
    "message": "Invalid credentials. Please fill all the fields.",
    "data": null
  }
```

- status : `400`

  If user sends _***Incorrect***_ `email` or `password`

```
{
    "success": false,
    "message": "Password or email mismatch",
    "data": null
}
```