const router = require("express").Router()
const usersDB = require("../models/user_model")
const { verifyToken } = require('../utils/verify_token')

router.put("/:mobileNumber", verifyToken, async (req, res) => {

    //validate request
    if (!req.body) return res.status(400).json({ message: "Cannot make changes. You have no are missing information..." })

    const mobileNumber = req.params.mobileNumber
    const newChanges = req.body

    try {
        //check if user exists
        const registeredUser = await usersDB.findByEmail(req.body.email)
        if (registeredUser.length != 0) {

            // check if phone number on registered user is same as params
            if (registeredUser[0].mobileNumber == req.params.mobileNumber) {
                // update user
                await usersDB.updateUser(mobileNumber, newChanges);
                return res.status(200).json({ message: "User updated..." })
            }
        }
        return res.status(500).json({ message: "User does not exist..." })

    } catch (err) {
        res.status(500).json({ message: "Error updating user..." })
    }
})

router.delete("/:mobileNumber", verifyToken, async (req, res) => {

    try {
        //check if user exists
        const registeredUser = await usersDB.findByEmail(req.body.email)
        if (registeredUser.length != 0) {
            // check if phone number on registered user is same as params
            if (registeredUser[0].mobileNumber == req.params.mobileNumber) {

                // delete user 
                const removedUser = await usersDB.removeUser(req.params.mobileNumber)

                if (removedUser) return res.status(204).send({ message: "User deleted..." })

                return res.status(500).json({ message: "User not deleted..." })
            }
        }

        return res.status(500).json({ message: "User does not exist..." })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router