import env from "./helpers/config.js";
import logger from "./helpers/logger.js";
import app from "./app.js";

app.listen(env.NODE_ENV == "production" ? env.PORT : env.ADMIN_PORT, () =>
  logger.info(
    `Server is live @ ${env.NODE_ENV == "production" ? env.LOCAL_URL : env.LOCAL_ADMIN_URL}`,
  ),
);
