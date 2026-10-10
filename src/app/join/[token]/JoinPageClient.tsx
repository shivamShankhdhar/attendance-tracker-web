"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import { StoreEnvelopeArtwork } from "@/components/Artworks";
import type { WorkspacePreview } from "@/lib/api";
import {
  IoCopyOutline,
  IoCheckmark,
  IoArrowForward,
  IoArrowBack,
  IoPeopleOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoSparklesOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

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
  const effectiveCode = workspace.targetTeam?.teamCode || workspace.workplaceCode || token;
  const deepLink = workspace.targetTeam?.teamCode
    ? `${scheme}://join?teamCode=${encodeURIComponent(workspace.targetTeam.teamCode)}`
    : `${scheme}://join?code=${encodeURIComponent(effectiveCode)}`;

  const storeUrl = playStoreUrl || "https://play.google.com/store/apps/details?id=bizora.app";
  const attempted = useRef(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // On mobile: try to open the app automatically.
  // If installed, OS intercepts and opens. If not, page stays visible.
  useEffect(() => {
    if (platform === "desktop" || attempted.current) return;
    attempted.current = true;
    const t = setTimeout(() => {
      window.location.href = deepLink;
    }, 600);
    return () => clearTimeout(t);
  }, [deepLink, platform]);

  const handleCopyCode = async (codeToCopy: string) => {
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          {/* Header Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BizoraWordmark />
            <Link
              href="/join"
              className="doc-nav-link"
              style={{ fontSize: 12.5, display: "flex", alignItems: "center", gap: 4 }}
            >
              <IoArrowBack style={{ fontSize: 14 }} />
              <span>Enter another code</span>
            </Link>
          </div>

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
                <StoreEnvelopeArtwork size={140} />
              </div>

              {/* Verified Invitation Pill */}
              <div className="invite-badge-pill">
                <div className="invite-badge-dot" />
                <span>Verified Workplace Invitation</span>
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

              {/* Designated Team Highlight Card (if assigned) */}
              {workspace.targetTeam && (
                <div
                  style={{
                    background: "var(--brand-tint)",
                    border: "1.5px solid #D2DEC0",
                    borderRadius: "var(--radius-md)",
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: workspace.targetTeam.color || "var(--brand)",
                        boxShadow: `0 0 6px ${workspace.targetTeam.color || "var(--brand)"}`,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-pressed)", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Designated Team
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>
                        {workspace.targetTeam.name}
                      </div>
                    </div>
                  </div>

                  {workspace.targetTeam.teamCode && (
                    <button
                      type="button"
                      onClick={() => handleCopyCode(workspace.targetTeam?.teamCode || "")}
                      title="Copy Team Code"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        padding: "5px 9px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--brand)",
                        cursor: "pointer",
                      }}
                    >
                      <span>#{workspace.targetTeam.teamCode}</span>
                      {copiedCode ? <IoCheckmark style={{ fontSize: 13 }} /> : <IoCopyOutline style={{ fontSize: 13 }} />}
                    </button>
                  )}
                </div>
              )}

              {/* Workplace Code Quick-Copy Card */}
              {workspace.workplaceCode && (
                <div
                  style={{
                    background: "var(--surface-muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>
                      Workplace Code:
                    </span>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--text-primary)", fontFamily: "monospace" }}>
                      {workspace.workplaceCode}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(workspace.workplaceCode || "")}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      padding: "5px 9px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--brand)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {copiedCode ? (
                      <>
                        <IoCheckmark />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <IoCopyOutline />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Meta Chips Grid */}
              <div className="meta-chips-grid">
                <div className="meta-chip-item">
                  <div className="meta-chip-icon-box">
                    <IoPersonOutline />
                  </div>
                  <div>
                    <span className="meta-chip-label">Workplace Admin: </span>
                    <strong className="meta-chip-val">{workspace.ownerName}</strong>
                  </div>
                </div>

                <div className="meta-chip-item">
                  <div className="meta-chip-icon-box">
                    <IoPeopleOutline />
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
                      <IoLocationOutline />
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
              effectiveCode={effectiveCode}
              playStoreUrl={playStoreUrl}
              workspaceName={workspace.workplaceName}
              workplaceCode={workspace.workplaceCode}
            />
          ) : (
            <MobileCTA
              deepLink={deepLink}
              storeUrl={storeUrl}
              workspaceName={workspace.workplaceName}
              effectiveCode={effectiveCode}
            />
          )}

          {/* Step Guide Box */}
          <div
            style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <IoSparklesOutline style={{ color: "var(--brand)", fontSize: 16 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-pressed)", textTransform: "uppercase", letterSpacing: 0.5 }}>
                How Joining Works
              </span>
            </div>

            <ol style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: "var(--text-primary)", lineHeight: 1.65 }}>
              <li style={{ marginBottom: 6 }}>
                <strong>Get Bizora:</strong> Tap <em>Open in Bizora App</em> or download from Google Play.
              </li>
              <li style={{ marginBottom: 6 }}>
                <strong>Sign In:</strong> Sign in with your Google account.
              </li>
              <li>
                <strong>Join Instantly:</strong> You&apos;ll see your invitation details — tap <strong>Join Workplace</strong> to enter immediately with zero hassle.
              </li>
            </ol>
          </div>

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
  effectiveCode,
}: {
  deepLink: string;
  storeUrl: string;
  workspaceName: string;
  effectiveCode: string;
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
        <a href={deepLink} id="mobile-open-app-btn" className="primary-cta-button">
          <IoShieldCheckmarkOutline style={{ fontSize: 18 }} />
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
  effectiveCode,
  playStoreUrl,
  workspaceName,
  workplaceCode,
}: {
  token: string;
  effectiveCode: string;
  playStoreUrl: string;
  workspaceName: string;
  workplaceCode?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://www.bizora.shivamshankhdhar.online/join?code=${effectiveCode}`);

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
