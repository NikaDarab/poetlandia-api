# Poetlandia Server | Node.js/Express

Live app: https://poetlandia-client.vercel.app/

API repo: https://github.com/NikaDarab/poetlandia-api

Client repo: https://github.com/NikaDarab/poetlandia-client

## About the Poetlandia Server

This server is built using Node.js/Express with the purpose of being the API/backend for the Poetlandia which allows Users to create, collaborate and publish their creative writings.

## Documentation

### Endpoints

#### Login Endpoint

`POST /api/login`

| Body Key    | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `user_name` | `string` | user_name is required |
| `password`  | `string` | password is required  |

#### Register User Endpoint

`POST /api/user`

| Body Key    | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `name`      | `string` | name is required      |
| `user_name` | `string` | user_name is required |
| `password`  | `string` | password is required  |

#### Library Endpoints

- Get public library
  `GET /api/library`
- Delete public library
  `DELETE /api/library/:libraryId`

### Edit/Post Library Route

`POST /api/library`
`PATCH /api/library/:libraryId`

| Body Key       | Type      | Description                         |
| :------------- | :-------- | :---------------------------------- |
| `title`        | `string`  | title of the library (Required)     |
| `author`       | `string`  | author (Required)                   |
| `lines`        | `string`  | content (Required)                  |
| `date_created` | `string`  | date and time the piece was created |
| `user_id`      | `integer` | user_id is (Required)               |

#### Collaboration Endpoints

- Get collaboration
  `GET /api/collaboration`
- Delete collaboration
  `DELETE /api/collaboration/:collaborationId`

### Edit/Post Collaboration Route

`POST /api/collaboration`
`PATCH /api/collaboration/:collaborationId`

| Body Key       | Type      | Description                           |
| :------------- | :-------- | :------------------------------------ |
| `title`        | `string`  | title of the collaboration (Required) |
| `author`       | `string`  | author (Required)                     |
| `lines`        | `string`  | content (Required)                    |
| `date_created` | `string`  | date and time the piece was created   |
| `user_id`      | `integer` | user_id is (Required)                 |

#### Drafts Endpoints

- Get public drafts
  `GET /api/drafts`
- Delete public library
  `DELETE /api/drafts/:draftsId`

### Edit/Post Drafts Route

`POST /api/drafts`
`PATCH /api/drafts/:draftsId`

| Body Key       | Type      | Description                         |
| :------------- | :-------- | :---------------------------------- |
| `title`        | `string`  | title of the draft(Required)        |
| `author`       | `string`  | author (Required)                   |
| `lines`        | `string`  | content (Required)                  |
| `date_created` | `string`  | date and time the piece was created |
| `user_id`      | `integer` | user_id is (Required)               |

### Status Codes

This API returns the following status codes:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

### Technology Used

- Node.js
- Express
- PostgreSQL
- Testing with Mocha and Chai

#### To install locally

- Clone the github repo to your machine.
- Run 'npm install' in git
- Run 'npm start'
