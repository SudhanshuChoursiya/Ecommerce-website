require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes.js");

const mongoose = require("mongoose");

const cors = require("cors");
const allowedOrigins = [
    "http://localhost:3000",
    "https://ecomerce-web-pi.vercel.app"
];

const options = {
    credentials: true,
    origin: allowedOrigins
};
app.use(cors(options));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose
    .connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch(error => {
        console.log(error);
    });

app.use("/api", routes);

app.listen(port, () => {
    console.log("server is running...");
});
