import { app } from "../src/app.js";
import { Connect_db } from "../src/config/Connect_db.js";

await Connect_db();

export default app;