const express = require("express")
const server = express()

const authRoutes = require("./routes/auth_routes")
const userRoutes = require("./routes/user_routes")

server.use(express.json())
server.use("/api/v1/auth", authRoutes)
server.use("/api/v1/user", userRoutes)

server.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome!" })
});

module.exports = server