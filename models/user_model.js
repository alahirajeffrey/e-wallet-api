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
const updateUser = (id, post) => {
    return db("users")
        .where("id", id)
        .update(post)
};

// remove user
const removeUser = id => {
    return db("users")
        .where("id", id)
        .del()
};

module.exports = {
    find,
    findByEmail,
    addUser,
    updateUser,
    removeUser
}