const db = require("../config/db_config")

// add a wallet
const addWallet = wallet => {
    return db("wallets").insert(wallet, "id")
};

// find single wallet
const findWalletByEmail = email => {
    return db('wallets').where("userEmail", email)
}

// // get balance of specific wallet
// const getWalletBalanceByEmail = email => {
//     return db("wallet").where("userEmail", email)
// };

// remove wallet
const removeWallet = email => {
    return db("wallet")
        .where("userEmail", email)
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