import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";
import { validateEnv } from "./utils/validateEnv.util";

validateEnv();

const app = new App([new AuthRoute()]);

app.listen();
