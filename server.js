const express = require("express")
const server = express()

const authRoutes = require("./routes/auth_routes")
const userRoutes = require("./routes/user_routes")
const walletRoutes = require("./routes/wallet_routes")

server.use(express.json())
server.use("/api/v1/auth", authRoutes)
server.use("/api/v1/user", userRoutes)
server.use("/api/v1/wallet", walletRoutes)

server.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome!" })
});

module.exports = server