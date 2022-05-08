const jwt = require('jsonwebtoken')
const usersDB = require("../models/user_model")

//function to verify jwt tokens
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token
    // return 404 error is token is not valid
    if (!authHeader) return res.status(401).json({ message: "Not authenticated" })

    // retrieve token if auth header is present
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, result) => {
        if (err) return res.status(403).json("Invalid token")
        req.user = user
        next()
    })
}

//function to verify token and authorize users
const tokenVerificationAndAuthorization = (req, res, next) => {

    // verify token
    verifyToken(req, res, () => {
        if (req.user.mobileNumber === req.params.mobileNumber) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}

module.exports = { verifyToken, tokenVerificationAndAuthorization } 