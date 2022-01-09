const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const connectionUri = process.env.MONGODB_CONNECTION_URI;

exports.dbConn = mongoose.createConnection(connectionUri);
