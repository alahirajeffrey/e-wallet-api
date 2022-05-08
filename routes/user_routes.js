const router = require("express").Router()
const usersDB = require("../models/user_model")
const { tokenVerificationAndAuthorization } = require('../utils/verify_token')

router.put("/:mobileNumber", tokenVerificationAndAuthorization, async (req, res) => {

    //validate request
    if (!req.params.mobileNumber) return res.status(400).json({ message: "Mobile number required..." })
    if (!req.body) res.status(404).json({ message: "Cannot make changes. You have no are missing information..." })

    const mobileNumber = req.params.mobileNumber
    const newChanges = req.body

    try {
        // update user
        await usersDB.updateUser(mobileNumber, newChanges);
        return res.status(200).json({ message: "User updated..." })
    } catch (err) {
        res.status(500).json({ err: "Error updating user..." })
    }
})

router.delete("/:mobileNumber", tokenVerificationAndAuthorization, async (req, res) => {

    //validate request
    if (!req.params.mobileNumber) return res.status(400).json({ message: "Mobile number required..." })

    try {
        const deleting = await usersDB.removeUser(req.params.mobileNumber)
        return res.status(204).json({ message: "User deleted..." })
    } catch (err) {
        res.status(500).json({ err: "Error in deleting user" })
    }
})

module.exports = router