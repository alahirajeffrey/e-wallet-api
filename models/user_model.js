const db = require("../config/db_config")

// get all users
const find = () => {
    return db("users")
};

// get specific user
const findByEmail = email => {
    return db("users").where("email", email)
};

// add a user
const addUser = user => {
    return db("users").insert(user, "id")
};

// update user
const updateUser = (mobileNumber, post) => {
    return db("users")
        .where("mobileNumber", mobileNumber)
        .update(post)
};

// remove user
const removeUser = mobileNumber => {
    return db("users")
        .where("mobileNumber", mobileNumber)
        .del()
};

module.exports = {
    find,
    findByEmail,
    addUser,
    updateUser,
    removeUser
}