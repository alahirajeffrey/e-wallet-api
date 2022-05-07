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
            first_name: "Jeffrey",
            last_name: "Alahira",
            password: '123456'
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
            first_name: "Jeffrey",
            last_name: "Alahira",
            email: 'estheralahira@gmail.com',
            password: '123456'
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
            first_name: "Jeffrey",
            last_name: "Alahira",
            email: 'alahirajeffrey@gmail.com',
            password: '123456'
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

    it('Should login user', (done) => {

        const user = {
            email: 'estheralahira@gmail.com',
            password: '123456'
        }

        chai.request(server)
            .get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
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
})


