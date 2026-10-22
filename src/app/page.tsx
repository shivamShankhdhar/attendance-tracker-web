import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import JoinCodeForm from "@/components/JoinCodeForm";
import { IoShieldCheckmarkOutline, IoInformationCircleOutline, IoLinkOutline } from "react-icons/io5";

export default function HomePage() {
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "https://play.google.com/store/apps/details?id=bizora.app";

  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BizoraWordmark />
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/about" className="doc-nav-link" id="home-to-about" style={{ fontSize: 12.5 }}>
                About
              </Link>
              <Link href="/privacy" className="doc-nav-link" id="home-to-privacy" style={{ fontSize: 12.5 }}>
                Privacy
              </Link>
              <Link href="/delete-account" className="doc-nav-link" id="home-to-delete" style={{ fontSize: 12.5, color: "var(--danger)" }}>
                Delete Account
              </Link>
            </div>
          </div>

          {/* Join Workplace Card */}
          <div className="card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-pressed)", textTransform: "uppercase", letterSpacing: 0.6, background: "var(--brand-tint)", padding: "3px 8px", borderRadius: 999 }}>
                  Invitation Portal
                </span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                Have an invitation link or code?
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Enter your workplace code (e.g. <code>BWP-XXXX-XXX</code>), team code (<code>TMXXXXXX</code>), or paste the shared link to join your team.
              </p>
            </div>

            <JoinCodeForm autoFocus placeholder="Enter code or paste shared link" buttonText="Join Workplace" />
          </div>

          {/* App Info Card */}
          <div className="card">
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                Smart Attendance. Seamless Management.
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Download Bizora on Android to track shifts, verify geofenced attendance, and manage workplace operations in real-time.
              </p>
            </div>

            <div className="divider" />

            <div className="stack" style={{ gap: 10 }}>
              <p className="section-label">Get the Bizora mobile app</p>
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
                <span>Privacy &amp; Policy</span>
              </Link>
            </div>
          </div>

          <p className="footer">
            Shared invitation links automatically open in the Bizora app when tapped on your mobile device.
          </p>

          <div className="footer-nav">
            <Link href="/join">Join Portal</Link>
            <span>&bull;</span>
            <Link href="/about">About Bizora</Link>
            <span>&bull;</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/delete-account" style={{ color: "var(--danger)" }}>Delete Account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
