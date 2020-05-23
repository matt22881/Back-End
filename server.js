const express = require('express')
const cors = require('cors')
const authRouter = require("./api/auth/auth-router")
const entriesRouter = require("./api/entries/entries-router")

const server = express()

server.use(express.json())
server.use(cors())

//routes
server.use("/auth", authRouter)
server.use("/api", entriesRouter)

//default error
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server