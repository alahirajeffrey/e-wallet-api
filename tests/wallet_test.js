// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const server = require("../server")

// const should = chai.should()

// chai.use(chaiHttp)

// /**
//  * TEST the /POST route
//  */

// describe('Create users to test wallet routes', () => {

//     it('Should register a first user', (done) => {

//         const user = {
//             firstName: "james",
//             lastName: "david",
//             email: 'jamesdavid@gmail.com',
//             password: 'jamesdavid',
//             mobileNumber: "01"
//         }

//         chai.request(server)
//             .post('/api/v1/auth/register')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(201)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('message')
//                 done()
//             })
//     })

//     it('Should register a second user', (done) => {

//         const user = {
//             firstName: "david",
//             lastName: "james",
//             email: 'davidjames@gmail.com',
//             password: 'davidjames',
//             mobileNumber: "02"
//         }

//         chai.request(server)
//             .post('/api/v1/auth/register')
//             .send(user)
//             .end((err, res) => {
//                 res.should.have.status(201)
//                 res.body.should.be.a('object')
//                 res.body.should.have.property('message')
//                 done()
//             })
//     })
// })

// describe("Login users and test wallet route", () => {

//     it('Should login first user', (done) => {

//         const user = {
//             email: 'jamesdavid@gmail.com',
//             password: 'jamesdavid'
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
//                 const first_user_token = res.body.token
//                 done()


//                 describe('Fund user account', (done) => {
//                     it("should return 200 when account is funded", (done) => {
//                         const user = {
//                             email: 'jamesdavid@gmail.com',
//                             amountToFund: 1000
//                         }

//                         chai.request(server)
//                             .post('api/v1/wallet/fundWallet')
//                             .send(user)
//                             .set('token', 'Bearer ' + first_user_token)
//                             .end((err, res) => {
//                                 res.should.have.status(200)
//                                 res.body.should.be.a('object')
//                                 res.body.should.have.property('message')
//                                 res.body.should.have.property('Balace')
//                                 done()
//                             })

//                         describe('DELETE user', () => {
//                             it('should delete user', (done) => {

//                                 const mobileNumber = "01"

//                                 chai.request(server)
//                                     .delete('/api/v1/user/' + mobileNumber)
//                                     .send(user)
//                                     .set('token', 'Bearer ' + first_user_token)
//                                     .end((err, response) => {
//                                         response.should.have.status(200)
//                                         response.should.be.a('object')

//                                         done()
//                                     })
//                             })
//                         })

//                     })
//                 })
//             })
//     })

// })