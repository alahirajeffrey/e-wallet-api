# Introduction
Backend system for a project management app(Ongoing project)

## FEATURES
- User authentication

## REQUIREMENTS
- [Nodejs](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Mongodb](https://www.mongodb.com/try/download/community) is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function which is the equivalent of relational database tables. 
- [Postman](https://www.postman.com/downloads/) is an API client that makes it easy for developers to create, share, test and document APIs. This is done by allowing users to create and save simple and complex HTTP/s requests, as well as read their responses. The result - more efficient and less tedious work.
- [Git](https://git-scm.com/) is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

## ENDPOINTS
| HTTP Verbs | Endpoints | Action | Required |
| --- | --- | --- | --- |
| POST | /api/v1/auth/register | Register a new user | req.body.firstName req.body.password req.body.email req.body.lastName |
| GET | /api/v1/auth/login | Login user |  req.body.email req.body.password|
| DELETE | /api/v1/user/delete/:id | Delete a user |  req.params.id|
| PUT | /api/v1/user/update/:id | Update a user |  req.params.id|

## HOW TO USE
- Ensure you have nodejs, git, mongodb and postman installed locally.
- clone this repository using `git clone https://github.com/alahirajeffrey/project-management-app-backend.git`
- Navigate to project folder and install dependencies using `npm install`
- Create .env file and add environment variables using .env.sample as a guide
- Open terminal and type `npm run dev` to start server in development mode, `npm run start` to start server in production mode or `npm run test` to run tests
- Use postman to test endpoints

## Author
[Alahira Jeffrey]((https://github.com/alahirajeffrey))

## LINCENSE
This project is available for use under the MIT License.

