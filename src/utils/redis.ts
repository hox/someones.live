import redis from "ioredis";
import { REDIS_DB, REDIS_HOST, REDIS_PORT } from "./config";

export const redisClient = new redis(parseInt(REDIS_PORT), REDIS_HOST, {
  db: parseInt(REDIS_DB),
});

redisClient.on("connect", () => console.log("Connected to Redis."));

redisClient.on("error", (err) => console.error(err));
