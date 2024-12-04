import winston from "winston";
import morgan from "morgan";
import env from "./config.js";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY/MM/DD HH:mm:ss:ms" }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/all.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

const loggerMiddleware = morgan(
  ":remote-addr :method :url :status [:response-time ms] :user-agent",
  {
    stream: {
      write: (message) => logger.info(message),
    },
    skip:() => env.NODE_ENV == "testing",
  }
);

export { loggerMiddleware, logger };
