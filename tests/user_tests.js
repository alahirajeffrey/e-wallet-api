// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const user = require("../models/user_model")
// const server = require("../server")

// const should = chai.should()

// chai.use(chaiHttp)

// describe("User routes test", () => {

//     /**
//      * Test PUT route
//      */

//     describe('UPDATE user', () => {
//         it('should return a 400 error if mobileNumber parameter is not given', (done) => {

//             const user = {
//                 firstName: "Jeffrey",
//                 lastName: "Alahira",
//                 email: "alahirajeffrey@gmail.com"
//             }

//             chai.request(server)
//                 .put('/api/v1/users/')
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(400)
//                     response.should.be.a('object')
//                     response.body.should.have.property('message')
//                     done()
//                 })
//         })

//         it('should return a 200 error when user is updated', (done) => {

//             const mobileNumber = "0701234"

//             const user = {
//                 firstName: "Alahira",
//                 lastName: "Jeffrey",
//                 email: "alahirajeffrey@gmail.com"
//             }

//             chai.request(server)
//                 .put('/api/v1/users/' + mobileNumber)
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(200)
//                     response.should.be.a('object')
//                     response.body.should.have.property('message').eq("User updated...")
//                     done()
//                 })


//         })

//         it('should return a 500 error when user with email does not exist', (done) => {

//             const mobileNumber = "0701234"

//             const user = {
//                 firstName: "Jeffrey",
//                 lastName: "Alahira",
//                 email: "jeffreyalahira@gmail.com"
//             }

//             chai.request(server)
//                 .put('/api/v1/users/' + mobileNumber)
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(200)
//                     response.should.be.a('object')
//                     response.body.should.have.property('message').eq("Error updating user...")
//                     done()
//                 })


//         })

//     })

//     /**
//      * Test DELETE route
//      */

//     describe('DELETE user', () => {
//         it('should return a 400 error if mobileNumber parameter is not given', (done) => {

//             chai.request(server)
//                 .delete('/api/v1/users/')
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(400)
//                     response.should.be.a('object')
//                     response.body.should.have.property('message').eq("Mobile number required...")
//                     done()
//                 })
//         })
//     })

//     describe('DELETE user', () => {
//         it('should return a 204 error if user is deleted', (done) => {

//             const mobileNumber = "070111"

//             chai.request(server)
//                 .delete('/api/v1/users/' + mobileNumber)
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(204)
//                     response.should.be.a('object')
//                     response.body.should.have.property('message').eq("User deleted...")
//                     done()
//                 })
//         })
//     })

// })
