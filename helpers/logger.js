import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log.json",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/info.log.json" }),
  ],
});

const loggerMiddleware = (request, response, next) => {
  const ip = request.ip || request.connection.remoteAddress;
  const userAgent = request.get("User-Agent") || "not specefied";

  const logEntry = {
    ipAddress: ip,
    userAgent: userAgent,
    url: request.url,
    method: request.method,
    status: response.statusCode,
  };
  logger.info(logEntry);
  next();
};

export { loggerMiddleware };
