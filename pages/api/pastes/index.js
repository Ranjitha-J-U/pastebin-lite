import { v4 as uuid } from "uuid";
import { redis } from "../../../lib/redis";
import { nowMs } from "../../../lib/time";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds !== undefined) {
    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return res.status(400).json({ error: "Invalid ttl_seconds" });
    }
  }

  if (max_views !== undefined) {
    if (!Number.isInteger(max_views) || max_views < 1) {
      return res.status(400).json({ error: "Invalid max_views" });
    }
  }

  const id = uuid();
  const now = nowMs(req);

  const paste = {
    content,
    created_at: now,
    expires_at: ttl_seconds ? now + ttl_seconds * 1000 : null,
    max_views: max_views ?? null,
    views: 0,
  };

  await redis.set(`paste:${id}`, paste);

const protocol = req.headers["x-forwarded-proto"] || "http";
const host = req.headers.host;

res.status(201).json({
  id,
  url: `${protocol}://${host}/p/${id}`,
});

}
