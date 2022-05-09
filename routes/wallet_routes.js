const router = require("express").Router()
const walletDB = require("../models/wallet_model")
const { verifyToken } = require('../utils/verify_token')
const transactionDB = require("../models/transactions_model")

router.post("/fundWallet", verifyToken, async (req, res) => {

    //validate request
    if (!req.body.email) return res.status(400).json({ message: "Email missing" })
    if (!req.body.amountToFund) return res.status(400).json({ message: "Amount to fund required" })

    try {

        //get current account balance
        const wallet = await walletDB.findWalletByEmail(req.body.email)

        if (wallet) {
            const accountBalance = wallet[0].accountBalance

            // add current balance and amount to fund 
            const amountToFund = req.body.amountToFund
            const newBalance = accountBalance + amountToFund

            //save new balance to user wallet
            const updatedWallet = await walletDB.updateWalletBalance(newBalance, req.body.email)
            if (updatedWallet) {
                return res.status(200).json({
                    message: "Success..",
                    Balance: `${newBalance}`
                })
            }
            return res.status(500).json({ message: "Error occured... Transaction failed" })
        }
        return res.status(500).json({ message: "Wallet not found " })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

router.post("/transferFund", verifyToken, async (req, res) => {

    //validate request
    if (!req.body.senderEmail) return res.status(400).json({ message: "Sender email missing" })
    if (!req.body.amountToTransfer) return res.status(400).json({ message: "Amount to transfer required" })
    if (!req.body.recieverEmail) return res.status(400).json({ message: "Reciever email missing" })

    // check if sender wallet exists
    const senderWallet = await walletDB.findWalletByEmail(req.body.senderEmail)
    if (senderWallet) {

        //search for wallet of reciever
        const recieverWallet = await walletDB.findWalletByEmail(req.body.recieverEmail)
        if (recieverWallet) {

            const senderBalanceBeforeTransfer = senderWallet[0].accountBalance
            const recieverBalanceBeforeTransfer = recieverWallet[0].accountBalance
            const amountToTransfer = req.body.amountToTransfer

            //check if sender has enough money to send
            if (senderBalanceBeforeTransfer < amountToTransfer) return res.status(400).json({ message: "Insufficient balance..." })

            //deduct fund from sender account
            const senderBalanceAfterTransfer = senderBalanceBeforeTransfer - amountToTransfer

            // send fund to reciever account
            const recieverBalanceAfterTransfer = recieverBalanceBeforeTransfer + amountToTransfer

            // update sender account
            await walletDB.updateWalletBalance(senderBalanceAfterTransfer, req.body.senderEmail)

            //update reciever account
            await walletDB.updateWalletBalance(recieverBalanceAfterTransfer, req.body.recieverEmail)

            return res.status(200).json({
                message: "Transfer successful...",
                Balance: `${senderBalanceAfterTransfer}`
            })
        }
        return res.status(500).json({ message: "Reciever's wallet not found..." })
    }
    return res.status(500).json({ message: "Sender Wallet not found..." })
})

router.get("/withdrawFund", verifyToken, async (req, res) => {

    //validate request
    if (!req.body.email) return res.status(400).json({ message: "Email missing" })
    if (!req.body.amountToWithdraw) return res.status(400).json({ message: "Amount to withdraw required" })

    try {
        //check if wallet exists
        const wallet = await walletDB.findWalletByEmail(req.body.email)
        if (wallet) {
            //get wallet balance
            const walletBalance = wallet[0].accountBalance
            const amountToWithdraw = req.body.amountToWithdraw

            // check if balance is greater than amount to withdraw
            if (walletBalance > amountToWithdraw) {
                // calculate balance after withdrawal
                const balanceAfterWithdrawal = walletBalance - amountToWithdraw

                //update wallet balance
                const walletAfterWithdrawal = await walletDB.updateWalletBalance(balanceAfterWithdrawal, req.body.email)
                if (walletAfterWithdrawal) {
                    return res.status(200).json({
                        message: `${amountToWithdraw} withdrawn`,
                        balance: `New balance ${balanceAfterWithdrawal}`
                    })
                }
            }

            return res.status(400).json({ message: "Insufficient balance..." })
        }
        // withdraw amount

    } catch (err) {
        return res.status(500).json({ message: "Sender Wallet not found..." })
    }

})

router.get("/walletBalance", verifyToken, async (req, res) => {

    //validate request
    if (!req.body.email) return res.status(400).json({ message: "Email missing" })

    try {
        const wallet = await walletDB.findWalletByEmail(req.body.email)
        const walletBalance = wallet[0].accountBalance

        return res.status(200).json({ message: `Account balance : ${walletBalance}` })

    } catch (err) {
        return res.status(500).json({ message: "Wallet not found..." })
    }

})

module.exports = router