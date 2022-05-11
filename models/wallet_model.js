const db = require("../config/db_config")

// add a wallet
const addWallet = wallet => {
    return db("wallets").insert(wallet, "id")
};

// find single wallet
const findWalletByEmail = email => {
    return db('wallets').where("userEmail", email)
}

// remove wallet
const removeWallet = mobileNumber => {
    return db("wallets")
        .where("userMobile", mobileNumber)
        .del()
};


// update wallet balance
const updateWalletBalance = (amountToFund, userEmail) => {
    return db('wallets')
        .where("userEmail", userEmail)
        .update("accountBalance", amountToFund)
}


module.exports = {
    addWallet,
    removeWallet,
    updateWalletBalance,
    findWalletByEmail,

}