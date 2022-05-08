## Problem Description
Even though strides are being made in the financial sector in nigeria. The problem of financial inclusion still remains i.e Not everybody has equal access to financial services which leaves room for a large percentage of people vulnerable to fraudlent activities. 

## Overview and Project Summary
in recent years, there has been a vast increase in the development and use of fintech and fintech related products. The aim of this project is to provide a sustainable solution that helps users overcome the shortcoming of traditional banking.

## Goals and Non Goals
- The goal of this project is to provide a secure platform for users to make financial transactions including funding their account, sending and recieving funds.
- This project does not aim to solve all the problems in the fintech space. Problems such as providing investment oppurtunities, provision of alternative lending facilities e.t.c  

## Requirements
#### Project Requirements
- [Nodejs](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Mysql](https://www.mongodb.com/try/download/community) is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB. Collections contain sets of documents and function which is the equivalent of relational database tables. 
- [Postman](https://www.postman.com/downloads/) is an API client that makes it easy for developers to create, share, test and document APIs. This is done by allowing users to create and save simple and complex HTTP/s requests, as well as read their responses. The result - more efficient and less tedious work.
- [Git](https://git-scm.com/) is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

#### Project Dependencies
- express
- bcrypt
- knex
- jsonwebtoken
- mysql
- dotenv
- uuid

#### Project Dev Dependencies
- mocha
- chai 
- chai-http
- nodemon

## Features
- User authentication
- Fund account
- Transfer funds
- Recieve funds

## API Endpoints
| HTTP Verbs | Endpoints | Action | Required |
| --- | --- | --- | --- |
| POST | /api/v1/auth/register | Register a new user | req.body.firstName req.body.password req.body.email req.body.lastName req.body.mobileNumber |
| GET | /api/v1/auth/login | Login user |  req.body.email req.body.password|
| DELETE | /api/v1/user/delete/:mobileNumber | Delete a user |  req.params.mobileNumber|
| PUT | /api/v1/user/update/:mobileNumber | Update a user |  req.params.mobileNumber req.body|

## Database Design

#### How to use
- clone this repository using `git clone https://github.com/alahirajeffrey/e-wallet-api.git`.
- Navigate to project folder and install dependencies using `npm install`.
- Create .env file and add environment variables using .env.sample as a guide.
- Open terminal and type `npm run test` to run tests.
- Type `npm run dev` to run server in development mode.
- Type `npm run start` to start server in production mode. 
- Use postman and navigate to desired endpoints 

#### Lincense
This project is available for use under the MIT License.

#### Author
[Alahira Jeffrey]((https://github.com/alahirajeffrey))

#### Reviewer
[Lendsqr](())