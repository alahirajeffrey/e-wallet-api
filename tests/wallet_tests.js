const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")

const should = chai.should()

chai.use(chaiHttp)

/**
 * TEST the /POST route
 */
describe('Register user to test wallet routes', () => {

    it('Should register a first user', (done) => {

        const user = {
            firstName: "Deborah",
            lastName: "Alahira",
            email: 'alahiradeborah@gmail.com',
            password: '123456',
            mobileNumber: "070123456"
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

    it('Should register a second user', (done) => {

        const user = {
            firstName: "Seyi",
            lastName: "Alahira",
            email: 'seyialahira@gmail.com',
            password: '123456',
            mobileNumber: "0701234567"
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

})


describe('/GET user', () => {

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
                done()

                /**
                * Test WALLET routes
                */

                describe("Fund wallet", () => {

                    it('should return a 400 error if email is not given', (done) => {

                        const user = {
                            firstName: "Jeffrey",
                            lastName: "Alahira",
                            amountToFund: 1000
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/fundWallet')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                //response.should.have.property('message').eq("Email missing")
                                done()
                            })
                    })

                    it('should return a 400 error if amountToFund is not given', (done) => {

                        const user = {
                            firstName: "Jeffrey",
                            lastName: "Alahira",
                            email: "alahirajeffrey@gmail.com"
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/fundWallet')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                //response.should.have.property("message").eq("Email missing")
                                done()
                            })
                    })

                    it('should fund wallet', (done) => {

                        const user = {
                            firstName: "Alahira",
                            lastName: "Jeffrey",
                            email: "alahirajeffrey@gmail.com",
                            amountToFund: 5000
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/fundWallet')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(200)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Success..")
                                response.body.should.have.property('Balance').eq('5000')
                                done()
                            })


                    })

                    it('should return a 500 error if userEmail does not exist', (done) => {

                        const user = {
                            firstName: "Jeffrey",
                            lastName: "Alahira",
                            email: "jeffreyalahira@gmail.com",
                            amountToFund: 1000
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/fundWallet')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("User does not exist...")
                                response.body.should.have.property('message').eq("Wallet not found ")
                                done()
                            })

                    })
                })

                describe("Transfer funds", () => {

                    it('should return a 400 error if senderEmail is not given', (done) => {

                        const user = {
                            amountToTransfer: 1000,
                            recieverEmail: "estheralahira@gmail.com"
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/transferFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                response.should.have.property("message").eq("Sender email missing")
                                done()
                            })
                    })

                    it('should return a 400 error if amountToTransfer is not given', (done) => {

                        const user = {
                            recieverEmail: "estheralahira@gmail.com",
                            senderEmail: "alahirajeffrey@gmail.com",
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/transferFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                response.should.have.property("message")
                                done()
                            })
                    })

                    it('should transfer funds', (done) => {

                        const user = {
                            amountToTransfer: 1000,
                            recieverEmail: "estheralahira@gmail.com",
                            senderEmail: "alahirajeffrey@gmail.com"
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/transferFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(200)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Transfer success...")
                                response.body.should.have.property('Balance').eq(4000)
                                done()
                            })
                    })

                    it('should return a 500 error if senderEmail does not exist', (done) => {

                        const user = {
                            senderEemail: "email",
                            amountToTransfer: 1500,
                            recieverEmail: "estheralahira@gmail.com"
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/transferFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Sender Wallet not found...")
                                done()
                            })

                    })
                    it('should return a 500 error if recieverEmail does not exist', (done) => {

                        const user = {
                            senderEemail: "alahirajeffrey@gmail.com",
                            amountToTransfer: 1500,
                            recieverEmail: "email@gmail.com"
                        }

                        chai.request(server)
                            .post('/api/v1/wallet/transferFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Sender Wallet not found...")
                                done()
                            })

                    })


                })

                describe("Withdraw funds", () => {

                    it('should return a 400 error if email is not given', (done) => {

                        const user = {
                            amountToWithdraw: 500,
                            //email: "estheralahira@gmail.com"
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/withdrawFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                response.should.have.property("message").eq("Email missing")
                                done()
                            })
                    })

                    it('should return a 400 error if amountToWithdraw is not given', (done) => {

                        const user = {
                            email: "estheralahira@gmail.com",
                            //amountToWithdraw: 500,
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/withdrawFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                response.should.have.property("message").eq("Amount to withdraw required")
                                done()
                            })
                    })

                    it('should withdraw funds', (done) => {

                        const user = {
                            amountToWithdraw: 500,
                            email: "estheralahira@gmail.com",
                            senderEmail: "alahirajeffrey@gmail.com"
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/withdrawFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(200)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("500 withdrawn")
                                response.body.should.have.property('Balance').eq("New balance 500")
                                done()
                            })
                    })

                    it('should return a 500 error if email does not exist', (done) => {

                        const user = {
                            eemail: "email",
                            amountToWithdraw: 1500,
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/withdrawFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Sender Wallet not found...")
                                done()
                            })

                    })
                    it('should return a 400 error if balance is insufficient', (done) => {

                        const user = {
                            email: "estheralahira@gmail.com",
                            amountToWithdraw: 1500,

                        }

                        chai.request(server)
                            .get('/api/v1/wallet/withdrawFund')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Insufficient balance...")
                                done()
                            })

                    })


                })

                describe("Show balance", () => {

                    it('should return a 400 error if email is not given', (done) => {

                        const user = {

                        }

                        chai.request(server)
                            .get('/api/v1/wallet/walletBalance')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(400)
                                response.should.be.a('object')
                                response.should.have.property("message").eq("Email missing")
                                done()
                            })
                    })

                    it('should show balance', (done) => {

                        const user = {
                            email: "estheralahira@gmail.com",
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/walletBalance')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(200)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Account balance : 500")
                                done()
                            })
                    })

                    it('should return a 500 error if wallet does not exists', (done) => {

                        const user = {
                            email: "email"
                        }

                        chai.request(server)
                            .get('/api/v1/wallet/walletBalance')
                            .send(user)
                            .set('token', 'Bearer ' + token)
                            .end((err, response) => {
                                response.should.have.status(500)
                                response.should.be.a('object')
                                response.body.should.have.property('message').eq("Wallet not found...")
                                done()
                            })

                    })
                })
            })
    })
})
