const express = require("express");
const routes = require("./features/routes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

require("./db-connection");

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.get("/", (req, res) => {
    res.send("pong, Server is up and running " + new Date());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is up and running on port 3000");
});