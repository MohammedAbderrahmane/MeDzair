import env from "./helpers/config.js";
import logger from "./helpers/logger.js";
import app from "./app.js";

app.listen(env.PORT, () => logger.info(`Server is live @ ${env.LOCAL_URL}`));
