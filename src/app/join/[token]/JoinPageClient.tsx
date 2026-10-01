"use client";

import { useEffect, useRef, useState } from "react";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import { StoreEnvelopeArtwork } from "@/components/Artworks";
import type { WorkspacePreview } from "@/lib/api";

interface Props {
  token: string;
  workspace: WorkspacePreview;
  platform: "ios" | "android" | "desktop";
  playStoreUrl: string;
  scheme: string;
}

export default function JoinPageClient({
  token,
  workspace,
  platform,
  playStoreUrl,
  scheme,
}: Props) {
  const deepLink = `${scheme}://join/${encodeURIComponent(token)}`;
  const storeUrl = playStoreUrl;
  const attempted = useRef(false);

  // On mobile: try to open the app immediately.
  // If installed, OS intercepts and opens. If not, page stays visible.
  useEffect(() => {
    if (platform === "desktop" || attempted.current) return;
    attempted.current = true;
    const t = setTimeout(() => {
      window.location.href = deepLink;
    }, 600);
    return () => clearTimeout(t);
  }, [deepLink, platform]);

  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <BizoraWordmark />

          {/* "Already installed?" banner — mobile only */}
          {platform !== "desktop" && (
            <div className="open-app-bar">
              <span className="open-app-bar-text">Already have Bizora?</span>
              <a href={deepLink} className="open-app-bar-link" id="open-app-link">
                Open in app →
              </a>
            </div>
          )}

          {/* Main Workplace Invitation Hero Card */}
          <div className="invite-hero-card">
            {/* Artwork Stage with Ambient Glow & Floating Animation */}
            <div className="artwork-stage">
              <div className="artwork-ambient-circle" />
              <div className="artwork-floating-wrap">
                <StoreEnvelopeArtwork size={145} />
              </div>

              {/* Verified Invitation Pill */}
              <div className="invite-badge-pill">
                <div className="invite-badge-dot" />
                <span>Workplace Invitation</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="invite-card-body">
              <div className="invite-title-block">
                <h1 className="invite-workplace-name">{workspace.workplaceName}</h1>
                <p className="invite-workplace-desc">
                  {workspace.description ||
                    `You've been invited by ${workspace.ownerName} to join this team on Bizora.`}
                </p>
              </div>

              {/* Meta Chips Grid */}
              <div className="meta-chips-grid">
                <div className="meta-chip-item">
                  <div className="meta-chip-icon-box">
                    <UserIcon />
                  </div>
                  <div>
                    <span className="meta-chip-label">Workplace Admin: </span>
                    <strong className="meta-chip-val">{workspace.ownerName}</strong>
                  </div>
                </div>

                <div className="meta-chip-item">
                  <div className="meta-chip-icon-box">
                    <UsersIcon />
                  </div>
                  <div>
                    <span className="meta-chip-label">Team: </span>
                    <strong className="meta-chip-val">
                      {workspace.activeMembersCount} active member
                      {workspace.activeMembersCount !== 1 ? "s" : ""}
                    </strong>
                  </div>
                </div>

                {workspace.address && (
                  <div className="meta-chip-item">
                    <div className="meta-chip-icon-box">
                      <PinIcon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="meta-chip-label">Location: </span>
                      <strong className="meta-chip-val">{workspace.address}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          {platform === "desktop" ? (
            <DesktopCTA
              token={token}
              playStoreUrl={playStoreUrl}
              workspaceName={workspace.workplaceName}
            />
          ) : (
            <MobileCTA
              deepLink={deepLink}
              storeUrl={storeUrl}
              workspaceName={workspace.workplaceName}
            />
          )}

          <p className="footer">
            This is a private invitation for <strong>{workspace.workplaceName}</strong> on Bizora.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ─── Mobile CTA ─── */
function MobileCTA({
  deepLink,
  storeUrl,
  workspaceName,
}: {
  deepLink: string;
  storeUrl: string;
  workspaceName: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="card">
      <div>
        <p style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Join {workspaceName}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Tap below to open in Bizora and accept your invitation, or install the app from Google Play.
        </p>
      </div>

      <div className="stack" style={{ gap: 10 }}>
        {/* Primary CTA */}
        <a
          href={deepLink}
          id="mobile-open-app-btn"
          className="primary-cta-button"
        >
          <WorkplaceIcon />
          <span>Open in Bizora App</span>
        </a>

        {/* Store Badge */}
        <div className="store-badge-wrap">
          <PlayStoreBadge href={storeUrl} id="mobile-store-btn" />
        </div>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="btn btn-outline"
          style={{ width: "100%", fontSize: 13, marginTop: 2 }}
        >
          {copied ? "✓ Invitation link copied to clipboard!" : "📋 Copy invitation link"}
        </button>
      </div>
    </div>
  );
}

/* ─── Desktop CTA ─── */
function DesktopCTA({
  token,
  playStoreUrl,
  workspaceName,
}: {
  token: string;
  playStoreUrl: string;
  workspaceName: string;
}) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://www.bizora.shivamshankhdhar.online/join/${token}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <div className="card">
      <div>
        <p style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Scan to open on your phone
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Point your phone camera at this QR code to open the invitation to <strong>{workspaceName}</strong> directly in the Bizora app.
        </p>
      </div>

      <div className="qr-wrapper">
        <div className="qr-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
              currentUrl
            )}&margin=0&color=1B2210&bgcolor=F5F6E8`}
            alt={`QR code for joining ${workspaceName}`}
            width={180}
            height={180}
            style={{ borderRadius: 8 }}
          />
        </div>
        <p className="qr-hint">Scan with your phone camera to join</p>
      </div>

      <button
        type="button"
        onClick={handleCopyLink}
        className="btn btn-outline"
        style={{ width: "100%", fontSize: 13 }}
      >
        {copied ? "✓ Invitation link copied to clipboard!" : "📋 Copy invitation link"}
      </button>

      <div className="divider" />

      <p className="section-label">Or get Bizora on Google Play:</p>
      <div className="stack" style={{ gap: 10 }}>
        <div className="store-badge-wrap">
          <PlayStoreBadge href={playStoreUrl} id="desktop-playstore-btn" />
        </div>
      </div>
    </div>
  );
}

/* ─── Icon helpers ─── */
function WorkplaceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
