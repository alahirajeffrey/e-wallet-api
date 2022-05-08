const router = require("express").Router()
const usersDB = require("../models/user_model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register new user
router.post("/register", async (req, res) => {

    //validate request
    if (!req.body.firstName) return res.status(400).json({ message: "First name required..." })
    if (!req.body.lastName) return res.status(400).json({ message: "Last name required..." })
    if (!req.body.email) return res.status(400).json({ message: "Email required..." })
    if (!req.body.password) return res.status(400).json({ message: "Password required..." })
    if (!req.body.mobileNumber) return res.status(400).json({ message: "Mobile number required..." })

    try {
        //check if user already exists
        const oldUser = await usersDB.findByEmail(req.body.email)
        if (oldUser != 0) return res.status(409).json({ message: `User with email : ${req.body.email} already exists` })

        //hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        // save new user to database
        const user = {
            firstName: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            mobileNumber: req.body.mobileNumber
        }

        const newUser = await usersDB.addUser(user)
        return res.status(201).json({ message: "New user registered..." })

    } catch (err) {
        return res.status(501).json({ message: err.message })
    }
})

// login user
router.get("/login", async (req, res) => {

    //validate request
    if (!req.body.email) return res.status(400).json({ message: "Email required..." })
    if (!req.body.password) return res.status(400).json({ message: "Password required..." })

    try {
        // check if user exists
        const registeredUser = await usersDB.findByEmail(req.body.email)
        if (registeredUser.length != 0) {

            //compare passwords if user is found
            const comparisonResult = await bcrypt.compare(req.body.password, registeredUser[0].password)
            if (!comparisonResult) return res.status(401).json({ message: "Incorrect password..." })
            //create json web token
            const token = jwt.sign({
                id: registeredUser.id,
                email: registeredUser.email
            },
                process.env.JWT_TOKEN_KEY,
                { expiresIn: '1h' })

            console.log(token)
            return res.status(200).json({ message: "Login successful" })
        }

        return res.status(500).json({ message: "User does not exist..." })

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router