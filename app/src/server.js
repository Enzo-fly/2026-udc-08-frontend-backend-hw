import { createDb } from "./db.js";
import { createApp } from "./app.js";

const db = createDb("notes.db");
const app = createApp(db);
const port = Number(process.env.PORT) || 3080;

app.listen(port, () => {
  console.log(`UDC WS8 notes app → http://localhost:${port}`);
});
