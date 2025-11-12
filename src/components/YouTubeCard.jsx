// src/components/YouTubeCard.jsx
import { useEffect, useState } from "react";

export default function YouTubeCard({
  channelId,
  title = "Featured Video",
  maxResults = 6,
  highlightMode = "mostViewed", // "mostViewed" | "latest"
}) {
  const [videos, setVideos] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYouTubeVideos() {
      try {
        setLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

        if (!apiKey || !channelId) {
          setError(
            "YouTube API key or channel ID missing. Set VITE_YOUTUBE_API_KEY and pass channelId."
          );
          setLoading(false);
          return;
        }

        // 1) Get recent videos for the channel
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search` +
            `?key=${apiKey}` +
            `&channelId=${channelId}` +
            `&part=snippet,id` +
            `&order=date` +
            `&maxResults=${maxResults}`
        );

        const searchData = await searchRes.json();

        const videoIds = searchData.items
          .map((item) => item.id && item.id.videoId)
          .filter(Boolean);

        if (!videoIds.length) {
          setError("No videos found for this channel.");
          setLoading(false);
          return;
        }

        // 2) Get stats (viewCount) for those videos
        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos` +
            `?key=${apiKey}` +
            `&id=${videoIds.join(",")}` +
            `&part=statistics,snippet`
        );
        const statsData = await statsRes.json();

        const videosData = statsData.items.map((v) => ({
          id: v.id,
          title: v.snippet.title,
          thumbnail: v.snippet.thumbnails?.medium?.url,
          views: Number(v.statistics.viewCount || 0),
          publishedAt: v.snippet.publishedAt,
        }));

        setVideos(videosData);

        let chosen = videosData[0];

        if (highlightMode === "mostViewed") {
          chosen = videosData.reduce((a, b) => (a.views > b.views ? a : b), videosData[0]);
        } else if (highlightMode === "latest") {
          chosen = videosData
            .slice()
            .sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            )[0];
        }

        setHighlight(chosen);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("Could not load YouTube data.");
      } finally {
        setLoading(false);
      }
    }

    fetchYouTubeVideos();
  }, [channelId, maxResults, highlightMode]);

  if (loading) {
    return (
      <section className="youtube-card">
        <h2>{title}</h2>
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Loading YouTube…</p>
      </section>
    );
  }

  if (error || !highlight) {
    return (
      <section className="youtube-card">
        <h2>{title}</h2>
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>{error || "No video to display."}</p>
      </section>
    );
  }

  const otherVideos = videos.filter((v) => v.id !== highlight.id);

  return (
    <section className="youtube-card">
      <h2>{title}</h2>

      {/* Main highlight card */}
      <div className="youtube-highlight">
        <div className="youtube-highlight-main">
          <h3 className="youtube-highlight-title">{highlight.title}</h3>
          <div className="youtube-player-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${highlight.id}`}
              title={highlight.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="youtube-highlight-views">
            {highlight.views.toLocaleString()} views
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${highlight.id}`}
            target="_blank"
            rel="noreferrer"
            className="btn watch-btn"
          >
            Watch on YouTube
          </a>
        </div>
      </div>

      {/* “Ticket” style smaller list */}
      {otherVideos.length > 0 && (
        <div className="youtube-mini-list">
          <h4>More from the channel</h4>
          <ul>
            {otherVideos.map((v) => (
              <li key={v.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={v.thumbnail} alt={v.title} />
                  <div className="youtube-mini-meta">
                    <span className="youtube-mini-title">{v.title}</span>
                    <span className="youtube-mini-views">
                      {v.views.toLocaleString()} views
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}