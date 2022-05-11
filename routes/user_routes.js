const router = require("express").Router()
const usersDB = require("../models/user_model")
const { verifyToken } = require('../utils/verify_token')
const walletDB = require("../models/wallet_model")

router.put("/:mobileNumber", verifyToken, async (req, res) => {

    //validate request
    if (!req.body.firstName && !req.body.lastName && !req.body.email) return res.status(400).json({
        message: "Error updating. Include firstName, lastName or email..."
    })

    const mobileNumber = req.params.mobileNumber
    const newChanges = req.body

    try {
        //check if user exists
        const registeredUser = await usersDB.findByMobileNumber(req.params.mobileNumber)
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

    if (!req.body.email) return res.status(400).json({ message: "Email required" })

    try {
        //check if user exists
        const registeredUser = await usersDB.findByMobileNumber(req.params.mobileNumber)

        if (!registeredUser) return res.status(500).json({ message: "User does not exist..." })

        if (registeredUser.length != 0) {
            // check if phone number on registered user is same as params
            if (registeredUser[0].mobileNumber == req.params.mobileNumber) {

                // delete user 
                const removedUser = await usersDB.removeUser(req.params.mobileNumber)
                if (removedUser) {

                    // check if wallet with email exists
                    const wallet = await walletDB.findWalletByEmail(req.body.email)
                    console.log(wallet)
                    if (wallet.length != 0 && wallet[0].userEmail == req.body.email) {

                        await walletDB.removeWallet(req.body.email)
                        return res.status(204).json({ message: "User and user wallet deleted..." })
                    }
                }
            }
            return res.status(403).json({ message: "Invalid access" })

        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router