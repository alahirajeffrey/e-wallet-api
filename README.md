## Problem Description
Even though strides are being made in the financial sector in nigeria. The problem of financial inclusion still remains i.e Not everybody has equal access to financial services which leave a large percentage of people vulnerable to fraudlent activities. 

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
- Check account balance

## User Workflow
- First step involves a user creating creating an account after which a wallet is automatically created for the user
- Upon creation, the user logs into his account
- The user can then fund his account with the desired amount
- The user can then transfer funds to other accounts, withdraw funds or check account balance.

![alt text](assets/user-workflow.png)

**NB : Endeavour to check the API endpoints section to know the required fields for each of the activity**    

## How to setup locally
- Open your terminal and clone this repository using `git clone https://github.com/alahirajeffrey/e-wallet-api.git`.
- Navigate to project folder and install dependencies using `npm install`.
- Create .env file and add environment variables using .env.sample as a guide.
- Run the command `npx knex migrate:latest` to create the tables. 
- Open terminal and type `npm run test` to run tests.
- Type `npm run dev` to run server in development mode.
- Type `npm run start` to start server in production mode. 
- Use postman and navigate to desired endpoints 

## API Endpoints
| HTTP Verbs | Endpoints | Action | Required |
| --- | --- | --- | --- |
| POST | https://nodejs-e-wallet-api.herokuapp.com/api/v1/auth/register | Register a new user | req.body.firstName <br> req.body.password <br> req.body.email <br> req.body.lastName <br> req.body.mobileNumber |
| GET | https://nodejs-e-wallet-api.herokuapp.com/api/v1/auth/login | Login user |  req.body.email <br> req.body.password|
| DELETE | https://nodejs-e-wallet-api.herokuapp.com//api/v1/user/delete/:mobileNumber | Delete a user |  req.params.mobileNumber <br> req.body.email|
| PUT | https://nodejs-e-wallet-api.herokuapp.com/api/v1/user/update/:mobileNumber | Update a user |  req.params.mobileNumber <br> req.body|
| POST | https://nodejs-e-wallet-api.herokuapp.com/api/v1/wallet/fundWallet | Fund wallet  | req.body.email <br> req.body.amountToFund |
| POST | https://nodejs-e-wallet-api.herokuapp.com/api/v1/wallet/transferFund | Transfer funds  | req.body.senderEmail <br> req.body.amountToTransfer <br> req.body.recieverEmail |
| GET | https://nodejs-e-wallet-api.herokuapp.com/api/v1/wallet/withdrawFund | Withdraw funds  | req.body.email <br> req.body.amountToWithdraw |
| GET | https://nodejs-e-wallet-api.herokuapp.com/api/v1/wallet/walletBalance | Check wallet balance  | req.body.email |

## Database Design
![alt text](assets/e-wallet-api-database-design.png)

#### Lincense
This project is available for use under the MIT License.

#### Author
[Alahira Jeffrey]((https://github.com/alahirajeffrey))

### Link to Deployed app
https://nodejs-e-wallet-api.herokuapp.com/
