import app from "./app.js";
import env from "./helpers/config.js";

app.listen(env.PORT, () => console.log(`Server is live @ ${env.LOCAL_URL}`));
