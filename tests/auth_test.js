const chai = require("chai")
const chaiHttp = require("chai-http")
const user = require("../models/user_model")
const server = require("../server")

const should = chai.should()

chai.use(chaiHttp)

/**
 * TEST the /POST route
 */
describe('/POST user', () => {

    it('should return a 400 error when email is absent ', (done) => {

        const user = {
            firstName: "Jeffrey",
            lastName: "Alahira",
            password: '123456',
        }

        chai.request(server)
            .post('/api/v1/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    it('Should register a new user', (done) => {

        const user = {
            firstName: "Jeffrey",
            lastName: "Alahira",
            email: 'alahirajeffrey@gmail.com',
            password: '123456',
            mobileNumber: "0701234"
        }

        chai.request(server)
            .post('/api/v1/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    it('should return a 409 error if user already exists', (done) => {

        const user = {
            firstName: "Jeffrey",
            lastName: "Alahira",
            email: 'alahirajeffrey@gmail.com',
            password: '123456',
            mobileNumber: "0701234"
        }

        chai.request(server)
            .post('/api/v1/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(409)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })
})


describe('/GET user', () => {

    it('should return a 400 error when email is not entered', (done) => {

        const user = { password: '123456' }

        chai.request(server)
            .get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    it('should return a 500 error when wrong email is entered', (done) => {

        const user = {
            email: 'esther@gmail.com',
            password: '123456'
        }

        chai.request(server)
            .get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    it('should return a 400 error when incorrect password is entered', (done) => {

        const user = {
            email: 'alahirajeffrey@gmail.com',
            password: '0000'
        }

        chai.request(server)
            .get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
    })

    it('Should login user', (done) => {

        const user = {
            email: 'alahirajeffrey@gmail.com',
            password: '123456'
        }

        chai.request(server)
            .get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.should.have.property('token')
                // get token from request body to test user routes
                const token = res.body.token

                /**
                * Test PUT route
                */

                describe("User routes test", () => {

                    it('should return a 404 error if mobileNumber parameter is not given', (done) => {

                        const user = {
                            firstName: "Jeffrey",
                            lastName: "Alahira",
                            email: "alahirajeffrey@gmail.com"
                        }

                        chai.request(server)
                            .put('/api/v1/user/')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(404)
                                response.should.be.a('object')
                                done()
                            })
                    })

                    it('should return a 200 error when user is updated', (done) => {

                        const mobileNumber = "0701234"

                        const user = {
                            firstName: "Alahira",
                            lastName: "Jeffrey",
                            email: "alahirajeffrey@gmail.com"
                        }

                        chai.request(server)
                            .put('/api/v1/user/' + mobileNumber)
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(200)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("User updated...")
                                done()
                            })


                    })

                    it('should return a 500 error when user with email does not exist', (done) => {

                        const mobileNumber = "0701234"

                        const user = {
                            firstName: "Jeffrey",
                            lastName: "Alahira",
                            email: "jeffreyalahira@gmail.com"
                        }

                        chai.request(server)
                            .put('/api/v1/user/' + mobileNumber)
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("User does not exist...")
                                done()
                            })


                    })
                })

                /**
                * Test DELETE route
                */

                describe('DELETE user', () => {
                    it('should return a 404 error if mobileNumber parameter is not given', (done) => {

                        chai.request(server)
                            .delete('/api/v1/user/')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(404)
                                response.should.be.a('object')
                                done()
                            })
                    })
                })

                describe('DELETE user', () => {
                    it('should delete user', (done) => {

                        const mobileNumber = "0701234"

                        chai.request(server)
                            .delete('/api/v1/user/' + mobileNumber)
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(204)
                                response.should.be.a('object')
                                response.body.should.have.property("message")
                                done()
                            })
                    })
                })
                done()
            })
    })
})
