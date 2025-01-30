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
      message = getExactCurrentTime() + " *** " + message;
    FileSystem.appendFileSync(this.config.info.file, message);
    console.log(message);
  }

  error(message) {
    message = message.trim() + "\n";
    if (this.config.error.time)
      message = getExactCurrentTime() + " *** " + message;
    FileSystem.appendFileSync(this.config.error.file, message);
    console.log(message);
  }
}

const logger = new Logger({
  info: {
    file: `${env.LOGS_FOLDER}/info.log`,
    // file: `info.log`,
    time: true,
  },
  error: {
    // file: `error.log`,
    file: `${env.LOGS_FOLDER}/error.log`,
    time: true,
  },
});

const devFormat =
  ":method *** :url *** :status *** :response-time ms *** :res[content-length]";

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
