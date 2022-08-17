const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const config = require("./config");

const api = require("./middlewares/api");
const promise = require("./middlewares/promise");
const locale = require("./middlewares/locale");

const logger = require("./utils/logger");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(promise());
app.use(locale());

app.use("/", api);

app.listen(config.server.port, () => {
    console.log("stage----",process.env.NODE_ENV);
    console.log("config.db.connectionUrl---",JSON.stringify(config.db.connectionUrl));
    console.log("config.db.connectionParams---",JSON.stringify(config.db.connectionParams));

    logger.info(
        `Server (${process.env.NODE_ENV}) is working on port ${config.server.port}`
    );
    mongoose
        .connect(config.db.connectionUrl)
        .then(() => logger.info("Connected to MongoDB"))
        .catch((err) => console.log(err));
});
