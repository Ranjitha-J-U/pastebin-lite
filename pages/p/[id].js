import { redis } from "../../lib/redis";
import { nowMs } from "../../lib/time";

export async function getServerSideProps({ params, req }) {
  const paste = await redis.get(`paste:${params.id}`);
  if (!paste) {
    return { notFound: true };
  }

  const now = nowMs(req);

  if (
    (paste.expires_at && now >= paste.expires_at) ||
    (paste.max_views && paste.views >= paste.max_views)
  ) {
    return { notFound: true };
  }

  paste.views += 1;
  await redis.set(`paste:${params.id}`, paste);

  return {
    props: {
      content: paste.content,
    },
  };
}

export default function PasteView({ content }) {
  return (
    <pre style={{ whiteSpace: "pre-wrap", padding: "20px" }}>
      {content}
    </pre>
  );
}
