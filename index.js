require("dotenv").config();
require("./database").connect();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const cors = require("cors");

const poolRouter = require("./pool-route");

app.use(cors());
app.use(express.json());

// Not found
/* app.use(function (req, res) {
	res.status(404).sendFile(__dirname + "/not-found.html");
}); */

app.use("/pool", poolRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
