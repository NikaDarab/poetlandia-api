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

## Screenshots

![Screen Shot 2021-04-05 at 1 08 39 PM](https://user-images.githubusercontent.com/43226446/113608398-289db780-9610-11eb-8245-c1e622f93d4a.png)
![Screen Shot 2021-04-05 at 12 37 44 PM](https://user-images.githubusercontent.com/43226446/113608489-41a66880-9610-11eb-8bac-27bf1e61379e.png)
![Screen Shot 2021-04-05 at 12 38 25 PM](https://user-images.githubusercontent.com/43226446/113608501-4834e000-9610-11eb-98e0-49e6f3691350.png)
![Screen Shot 2021-04-05 at 12 39 00 PM](https://user-images.githubusercontent.com/43226446/113608409-2c313e80-9610-11eb-8d62-68b88132bcee.png)
![Screen Shot 2021-04-05 at 12 36 49 PM](https://user-images.githubusercontent.com/43226446/113608426-32271f80-9610-11eb-9807-c1d0fbbc5478.png)

#### To install locally

- Clone the github repo to your machine.
- Run 'npm install' in git
- Run 'npm start'
