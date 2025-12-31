import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  async function createPaste() {
    setError(null);
    setUrl(null);

    const payload = {
      content,
    };

    if (ttl) payload.ttl_seconds = Number(ttl);
    if (maxViews) payload.max_views = Number(maxViews);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error creating paste");
      return;
    }

    setUrl(data.url);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows="8"
        cols="60"
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <label>
        Expiry time (seconds):
        <input
          type="number"
          min="1"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </label>

      <br /><br />

      <label>
        Max views:
        <input
          type="number"
          min="1"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </label>

      <br /><br />

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {url && (
        <p>
          Share link: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
