"use client";

import { useEffect, useRef, useState } from "react";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
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
    const t = setTimeout(() => { window.location.href = deepLink; }, 500);
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

          {/* Invitation label */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="badge badge-pending">Invitation</span>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              You've been invited to join a workplace
            </span>
          </div>

          {/* Workspace preview card */}
          <div className="card">
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div className="workspace-hero">
                <WorkplaceIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="workspace-name">{workspace.workplaceName}</h1>
                {workspace.description && (
                  <p className="workspace-description">{workspace.description}</p>
                )}
              </div>
            </div>

            <div className="divider" />

            <div className="meta-grid">
              <div className="meta-row">
                <UserIcon />
                <span>Admin: <strong>{workspace.ownerName}</strong></span>
              </div>
              <div className="meta-row">
                <UsersIcon />
                <span>
                  <strong>{workspace.activeMembersCount}</strong> active member{workspace.activeMembersCount !== 1 ? "s" : ""}
                </span>
              </div>
              {workspace.address && (
                <div className="meta-row">
                  <PinIcon />
                  <span style={{ flex: 1 }}>{workspace.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          {platform === "desktop"
            ? <DesktopCTA token={token} playStoreUrl={playStoreUrl} workspaceName={workspace.workplaceName} />
            : <MobileCTA deepLink={deepLink} storeUrl={storeUrl} workspaceName={workspace.workplaceName} />
          }

          <p className="footer">
            This is a private invitation for <strong>{workspace.workplaceName}</strong>.
            Do not share this link publicly.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ─── Mobile CTA ─── */
function MobileCTA({ deepLink, storeUrl, workspaceName }: {
  deepLink: string; storeUrl: string; workspaceName: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="card">
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
          Join {workspaceName}
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Download the Bizora app, sign in with Google, and you'll land straight on the workplace details screen to request to join.
        </p>
      </div>
      <div className="stack" style={{ gap: 10 }}>
        <div className="store-badge-wrap">
          <PlayStoreBadge href={storeUrl} id="mobile-store-btn" />
        </div>
        <a href={deepLink} id="mobile-open-app-btn" className="btn btn-ghost" style={{ width: "100%" }}>
          Already installed — Open app
        </a>
        <button
          type="button"
          onClick={handleCopyLink}
          className="btn btn-outline"
          style={{ width: "100%", fontSize: 13 }}
        >
          {copied ? "✓ Link copied to clipboard" : "📋 Copy invitation link"}
        </button>
      </div>
    </div>
  );
}

/* ─── Desktop CTA ─── */
function DesktopCTA({ token, playStoreUrl, workspaceName }: {
  token: string; playStoreUrl: string; workspaceName: string;
}) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://bizora.app/join/${token}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="card">
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
          Scan to open on your phone
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Point your phone camera at this QR code to open the invitation to <strong>{workspaceName}</strong> in the Bizora app.
        </p>
      </div>

      <div className="qr-wrapper">
        <div className="qr-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&margin=0&color=1B2210&bgcolor=F5F6E8`}
            alt={`QR code for joining ${workspaceName}`}
            width={180}
            height={180}
            style={{ borderRadius: 8 }}
          />
        </div>
        <p className="qr-hint">Open your phone camera and point at the code</p>
      </div>

      <button
        type="button"
        onClick={handleCopyLink}
        className="btn btn-outline"
        style={{ width: "100%", fontSize: 13 }}
      >
        {copied ? "✓ Link copied to clipboard" : "📋 Copy invitation link"}
      </button>

      <div className="divider" />

      <p className="section-label">Or download the app first:</p>
      <div className="stack" style={{ gap: 10 }}>
        <div className="store-badge-wrap">
          <PlayStoreBadge href={playStoreUrl} id="desktop-playstore-btn" />
        </div>
      </div>
    </div>
  );
}

/* ─── Icon helpers (matching Feather icons used in mobile app) ─── */
function WorkplaceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B692D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
