import type { Metadata } from "next";
import { BizoraWordmark } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Invalid Invitation — Bizora",
};

export default function JoinNotFound() {
  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <BizoraWordmark />
          <div className="card" style={{ alignItems: "center", textAlign: "center" }}>
            <div className="error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BA3B2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 19, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                Invalid or expired link
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                This invitation link is no longer valid. It may have expired or your admin may have rotated it to generate a new one.
              </p>
            </div>
            <div className="divider" style={{ width: "100%" }} />
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Ask your admin to share a fresh invitation link from the Bizora app.
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
