import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";

const port = Number(process.env.PORT ?? 3000);

const mongoUri = process.env.MONGODB_URI;

async function startServer() {
  if (mongoUri === undefined || mongoUri === "") {
    throw new Error("آدرس دیتابیس تنظیم نشده است");
  }

  await connectDB(mongoUri);

  app.listen(port, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:${port} 👽🛸🛰️`);
  });
}

startServer().catch((err) => {
  console.log("laoding setting have problem:", err);
  // ido :- process.exitCode = 1 کد خروج برنامه را روی حالت شکست می‌گذارد؛ برنامه را همان لحظه متوقف نمی‌کند.
  process.exitCode = -1;
});
