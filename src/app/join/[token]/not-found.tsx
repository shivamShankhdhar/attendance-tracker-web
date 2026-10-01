import type { Metadata } from "next";
import { BizoraWordmark } from "@/components/BrandLogo";
import { ExpiredInviteArtwork } from "@/components/Artworks";

export const metadata: Metadata = {
  title: "Invalid Invitation — Bizora",
};

export default function JoinNotFound() {
  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <BizoraWordmark />
          <div className="card invite-hero-card" style={{ alignItems: "center", textAlign: "center", paddingTop: 28 }}>
            <div style={{ marginBottom: 14 }}>
              <ExpiredInviteArtwork size={120} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                Invalid or expired link
              </h1>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 320, margin: "0 auto" }}>
                This invitation link is no longer valid. It may have expired or your administrator may have generated a fresh one.
              </p>
            </div>
            <div className="divider" style={{ width: "100%", margin: "20px 0" }} />
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Ask your workplace admin to share a fresh invitation link from the Bizora app.
            </p>
          </div>
          <p className="footer">
            Bizora — Workforce Attendance OS
          </p>
        </div>
      </div>
    </main>
  );
}

