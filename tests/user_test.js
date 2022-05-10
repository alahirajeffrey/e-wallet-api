// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const server = require("../server")

// const should = chai.should()

// chai.use(chaiHttp)

// describe('Register user to test user routes', () => {

//     it('Should register a new user and create a wallet', (done) => {

//         const user = {
//             firstName: "Daniel",
//             lastName: "Alahira",
//             email: 'danielalahira@gmail.com',
//             password: '123456',
//             mobileNumber: "07012345"
//         }

//         chai.request(server)
//             .post('/api/v1/auth/register')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(201)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('message').eq("New user registered and wallet created")
//                 done()
//             })
//     })

//     it('Should login user', (done) => {

//         const user = {
//             email: 'danielalahira@gmail.com',
//             password: '123456'
//         }

//         chai.request(server)
//             .get('/api/v1/auth/login')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(200)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('message')
//                 res.body.should.have.property('token')
//                 // get token from request body to test user routes
//                 const token = res.body.token
//                 done()

//                 /**
//                 * Test PUT route
//                 */

//                 describe("User routes test", () => {

//                     it('should return a 404 error if mobileNumber parameter is not given', (done) => {

//                         const user = {
//                             firstName: "Daniel",
//                             lastName: "Alahira",
//                             email: "danielalahira@gmail.com"
//                         }

//                         chai.request(server)
//                             .put('/api/v1/user/')
//                             .send(user)
//                             .set('token', 'Bearer ' + token)
//                             .end((err, response) => {
//                                 response.should.have.status(404)
//                                 response.should.be.a('object')
//                                 done()
//                             })
//                     })

//                     it('should return a 200 error when user is updated', (done) => {

//                         const mobileNumber = "07012345"

//                         const user = {
//                             firstName: "Daniel",
//                             lastName: "Jeffrey",
//                             email: "danielalahira@gmail.com"
//                         }

//                         chai.request(server)
//                             .put('/api/v1/user/' + mobileNumber)
//                             .send(user)
//                             .set('token', 'Bearer ' + token)
//                             .end((err, response) => {
//                                 response.should.have.status(200)
//                                 response.should.be.a('object')
//                                 response.body.should.have.property('message').eq("User updated...")
//                                 done()
//                             })
//                     })

//                     it('should return a 500 error when user with email does not exist', (done) => {

//                         const mobileNumber = "0701234"

//                         const user = {
//                             firstName: "Daniel",
//                             lastName: "Alahira",
//                             email: "jeffreyalahira@gmail.com"
//                         }

//                         chai.request(server)
//                             .put('/api/v1/user/' + mobileNumber)
//                             .send(user)
//                             .set('token', 'Bearer ' + token)
//                             .end((err, response) => {
//                                 response.should.have.status(500)
//                                 response.should.be.a('object')
//                                 response.body.should.have.property('message').eq("User does not exist...")
//                                 done()
//                             })
//                     })
//                 })

//                 /**
//                 * Test DELETE route
//                 */

//                 describe('DELETE user routes', () => {
//                     it('should return a 404 error if mobileNumber parameter is not given', (done) => {

//                         chai.request(server)
//                             .delete('/api/v1/user/')
//                             .send(user)
//                             .set('token', 'Bearer ' + token)
//                             .end((err, response) => {
//                                 response.should.have.status(404)
//                                 response.should.be.a('object')
//                                 done()
//                             })
//                     })
//                 })

//                 describe('DELETE user', () => {
//                     it('should delete user', (done) => {

//                         const mobileNumber = "07012345"

//                         chai.request(server)
//                             .delete('/api/v1/user/' + mobileNumber)
//                             .send(user)
//                             .set('token', 'Bearer ' + token)
//                             .end((err, response) => {
//                                 response.should.have.status(204)
//                                 response.should.be.a('object')
//                                 done()
//                             })
//                     })
//                 })

//             })
//     })
// })
