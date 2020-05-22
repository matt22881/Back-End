const express = require('express')
const cors = require('cors')
const authRouter = require("./api/auth/auth-router")

const server = express()

server.use(express.json())
server.use(cors())

//routes
server.use("/auth", authRouter)

//default error
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server