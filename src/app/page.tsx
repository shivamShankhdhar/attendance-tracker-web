import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";

export default function HomePage() {
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#";

  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <BizoraWordmark />

          <div className="card">
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                Smart Attendance. Seamless Management.
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                If your admin shared a workplace invitation link, tap it on your phone and it will open directly in the app. Or download Bizora to get started.
              </p>
            </div>

            <div className="divider" />

            <div className="stack" style={{ gap: 10 }}>
              <p className="section-label">Download the app</p>
              <div className="store-badge-wrap">
                <PlayStoreBadge href={playStoreUrl} id="home-playstore-btn" />
              </div>
            </div>
          </div>

          <p className="footer">
            Have an invitation link? Tap it on your phone — it will open in the Bizora app automatically.
          </p>
        </div>
      </div>
    </main>
  );
}
