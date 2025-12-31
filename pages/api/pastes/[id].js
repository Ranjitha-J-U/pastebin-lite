import { redis } from "../../../lib/redis";
import { nowMs } from "../../../lib/time";

export default async function handler(req, res) {
  const { id } = req.query;
  const key = `paste:${id}`;

  const paste = await redis.get(key);
  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  const now = nowMs(req);

  if (paste.expires_at && now >= paste.expires_at) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.max_views && paste.views >= paste.max_views) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await redis.set(key, paste);

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.max_views
      ? paste.max_views - paste.views
      : null,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
