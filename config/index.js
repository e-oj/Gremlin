/* eslint-disable no-undef */

/**
 * @author EmmanuelOlaojo
 * @since 11/22/17
 */

const DB_ADDRESS = "mongodb://localhost:27017";
const COLLECTION = process.env.COLLECTION || "Gremlin";

exports.PORT = process.env.PORT || 8234;
exports.SECRET = "gremlin-secret";
exports.DB_URL = `${DB_ADDRESS}/${COLLECTION}`;
exports.MONGO_ERR = "MongoError";
exports.DUP_ERR = 11000;
exports.AUTH_TOKEN = "x-auth-token";
exports.DEFAULT_ERR_MSG = "OOPS! Sumfin goofed!!";
exports.AUTH_ERR_MSG = "Authentication Failed!";
exports.MAX_PAYLOAD = "50mb";

