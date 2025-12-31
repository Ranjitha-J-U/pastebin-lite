import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
console.log("REDIS URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("REDIS TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "MISSING");
