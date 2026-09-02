import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

export const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (error) => {
  console.log("Redis Error:", error);
});