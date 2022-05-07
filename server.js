const express = require("express")
const server = express()

const authRoutes = require("./routes/auth_routes")

server.use(express.json())
server.use("/api/v1/auth", authRoutes)
//server.use("/api/v1/wallet", wallet_routes)

module.exports = server