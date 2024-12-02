import winston from "winston";
import morgan from "morgan";

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
      level: level(),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

const loggerMiddleware = morgan(
  ":remote-addr :remote-user :method :url :status [:response-time ms]",
  {
    stream: { write: (message) => logger.info(message) },
  }
);

export { loggerMiddleware, logger };
