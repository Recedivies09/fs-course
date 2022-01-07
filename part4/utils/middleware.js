const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const morgan = require("morgan");

const customMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(res.req.body),
  ].join(" ");
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request["token"] = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);
  if (user) {
    request["user"] = user;
  }
  next();
};

module.exports = {
  customMorgan,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
