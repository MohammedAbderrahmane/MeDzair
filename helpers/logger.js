import morgan from "morgan";
import env from "./config.js";
import FileSystem from "fs";

import { getExactCurrentTime } from "./helpers.js";

class Logger {
  config;

  constructor(config) {
    this.config = config;
  }

  info(message) {
    message = message.trim() + "\n";
    if (this.config.info.time)
      message = getExactCurrentTime() + " - " + message;
    FileSystem.appendFileSync(this.config.info.file, message);
    console.log(message);
  }

  error(message) {
    message = message.trim() + "\n";
    if (this.config.error.time)
      message = getExactCurrentTime() + " - " + message;
    FileSystem.appendFileSync(this.config.error.file, message);
    console.log(message);
  }
}

const logger = new Logger({
  info: {
    file: `${env.LOGS_FOLDER}/info.log`,
    time: true,
  },
  error: {
    file: `${env.LOGS_FOLDER}/error.log`,
    time: true,
  },
});

// --- Custom padded tokens so columns line up ---
morgan.token("pmethod", (req) => (req.method || "-").padEnd(5, " "));

morgan.token("pstatus", (req, res) =>
  String(res.statusCode || "-").padEnd(3, " ")
);

morgan.token("presponse-time", function (req, res) {
  const time = morgan["response-time"](req, res);
  return (time ? `${time}ms` : "-").padEnd(9, " ");
});

morgan.token("plength", (req, res) => {
  const length = res.getHeader("content-length");
  return (length ? `${length/8}B` : "0B").padEnd(8, " ");
});

morgan.token("pip", (req) => {
  const ip = req.ip || req.connection?.remoteAddress || "-";
  return ip.padEnd(15, " ");
});

morgan.token("pua", (req) => req.headers["user-agent"] || "-");

morgan.token("purl", (req) => (req.originalUrl || req.url || "-").padEnd(40, " "));

const devFormat =
  ":pmethod - :purl - :pstatus - :presponse-time - :plength - :pip - :pua";

const loggerMiddleware = morgan(devFormat, {
  stream: { write: (message) => logger.info(message) },
  skip: (req, res) => res.statusCode >= 400,
});

const errorLoggerMiddleware = morgan(devFormat, {
  stream: { write: (message) => logger.error(message) },
  skip: (req, res) => res.statusCode < 400,
});

export default logger;
export { loggerMiddleware, errorLoggerMiddleware };