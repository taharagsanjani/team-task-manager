import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${port} 👽🛸🛰️`);
});
