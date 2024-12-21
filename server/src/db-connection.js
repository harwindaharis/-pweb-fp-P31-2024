const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.DATABASE_URI;
console.log("Mongo URI:", mongoURI);

if (!mongoURI) {
    console.error("Mongo URI is required");
    process.exit(1);
}

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    });
