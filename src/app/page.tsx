import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import { IoShieldCheckmarkOutline, IoInformationCircleOutline } from "react-icons/io5";

export default function HomePage() {
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#";

  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BizoraWordmark />
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/about" className="doc-nav-link" id="home-to-about" style={{ fontSize: 12 }}>
                About
              </Link>
              <Link href="/privacy" className="doc-nav-link" id="home-to-privacy" style={{ fontSize: 12 }}>
                Privacy
              </Link>
            </div>
          </div>

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

            <div className="divider" />

            {/* Quick links to About & Security/Privacy */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Link
                href="/about"
                className="btn-ghost"
                id="home-about-card-btn"
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <IoInformationCircleOutline style={{ fontSize: 16 }} />
                <span>About Bizora</span>
              </Link>
              <Link
                href="/privacy"
                className="btn-ghost"
                id="home-privacy-card-btn"
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <IoShieldCheckmarkOutline style={{ fontSize: 16 }} />
                <span>Privacy &amp; AdMob</span>
              </Link>
            </div>
          </div>

          <p className="footer">
            Have an invitation link? Tap it on your phone — it will open in the Bizora app automatically.
          </p>

          <div className="footer-nav">
            <Link href="/about">About Bizora</Link>
            <span>&bull;</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

