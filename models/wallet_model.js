const db = require("../config/db_config")

// add a wallet
const addWallet = wallet => {
    return db("wallets").insert(wallet, "id")
};

// find single wallet
const findWalletByEmail = email => {
    return db('wallet').where("userEmail", email)
}

// get balance of specific wallet
const getWalletBalanceByEmail = email => {
    return db("wallet").where("userEmail", email)
};

// remove wallet
const removeWallet = email => {
    return db("wallet")
        .where("userEmail", email)
        .del()
};

// update wallet balance
const updateWalletBalance = (amount, userEmail) => {
    return db('wallet')
        .where("userEmail", userEmail)
        .update("accountBalance", amount)
}


module.exports = {
    addWallet,
    removeWallet,
    updateWalletBalance,
    getWalletBalanceByEmail,

}