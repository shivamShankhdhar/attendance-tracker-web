import { headers } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchWorkspacePreview, extractCodeFromInput } from "@/lib/api";
import { detectPlatform } from "@/lib/platform";
import { BizoraWordmark } from "@/components/BrandLogo";
import { PlayStoreBadge } from "@/components/StoreBadges";
import { StoreEnvelopeArtwork } from "@/components/Artworks";
import JoinPageClient from "./[token]/JoinPageClient";
import JoinCodeForm from "@/components/JoinCodeForm";
import { IoWarningOutline, IoArrowBack } from "react-icons/io5";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawParam =
    params.wp ||
    params.workplaceCode ||
    params.code ||
    params.token ||
    params.teamCode ||
    params.team ||
    params.invite ||
    params.q;

  const rawToken = Array.isArray(rawParam) ? rawParam[0] : rawParam;
  const cleanToken = rawToken ? extractCodeFromInput(rawToken) : "";

  if (!cleanToken) {
    return {
      title: "Join Workplace — Bizora",
      description: "Enter your workplace code or paste your invitation link to join your team on Bizora.",
    };
  }

  const workspace = await fetchWorkspacePreview(cleanToken);
  if (!workspace) {
    return { title: "Workplace Invitation — Bizora" };
  }

  return {
    title: `Join ${workspace.workplaceName} — Bizora`,
    description: `You've been invited to join ${workspace.workplaceName}${
      workspace.targetTeam ? ` (${workspace.targetTeam.name})` : ""
    } on Bizora. Download the app or join directly.`,
    openGraph: {
      title: `Join ${workspace.workplaceName} on Bizora`,
      description: `${workspace.activeMembersCount} members · Admin: ${workspace.ownerName}`,
      type: "website",
    },
  };
}

export default async function JoinQueryPage({ searchParams }: Props) {
  const params = await searchParams;
  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  const platform = detectPlatform(ua);

  const rawParam =
    params.wp ||
    params.workplaceCode ||
    params.code ||
    params.token ||
    params.teamCode ||
    params.team ||
    params.invite ||
    params.q;

  const rawToken = Array.isArray(rawParam) ? rawParam[0] : rawParam;
  const cleanToken = rawToken ? extractCodeFromInput(rawToken) : "";

  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "https://play.google.com/store/apps/details?id=bizora.app";
  const scheme = process.env.NEXT_PUBLIC_APP_SCHEME || "bizora";

  // Case 1: Query parameter provided -> Fetch workplace preview
  if (cleanToken) {
    const workspace = await fetchWorkspacePreview(cleanToken);

    if (workspace) {
      return (
        <JoinPageClient
          token={cleanToken}
          workspace={workspace}
          platform={platform}
          playStoreUrl={playStoreUrl}
          scheme={scheme}
        />
      );
    }

    // Invalid or expired code state with recovery input
    return (
      <main className="page">
        <div className="container">
          <div className="stack">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <BizoraWordmark />
              <Link href="/" className="doc-nav-link" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                <IoArrowBack /> Home
              </Link>
            </div>

            <div className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--danger-tint)",
                  color: "var(--danger)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <IoWarningOutline style={{ fontSize: 28 }} />
              </div>

              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                Invitation Not Found
              </h1>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                We couldn&apos;t find an active workplace for code or link <code>{cleanToken}</code>. The link may have expired or was rotated by your employer.
              </p>

              <div className="divider" style={{ margin: "20px 0" }} />

              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, textAlign: "left" }}>
                Try another code or link:
              </p>
              <JoinCodeForm initialValue={cleanToken} autoFocus buttonText="Lookup Code" />
            </div>

            <p className="footer">
              Need help? Ask your employer or HR admin to re-send the invitation link or share their workplace code.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Case 2: No query parameter -> Welcome Join Portal
  return (
    <main className="page">
      <div className="container">
        <div className="stack">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BizoraWordmark />
            <Link href="/" className="doc-nav-link" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <IoArrowBack /> Home
            </Link>
          </div>

          <div className="card">
            <div style={{ textAlign: "center", padding: "12px 0 6px" }}>
              <div style={{ display: "inline-block", marginBottom: 14 }}>
                <StoreEnvelopeArtwork size={110} />
              </div>
              <h1 style={{ fontSize: 21, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                Join Your Workplace
              </h1>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Received an invitation link, workplace code, or team code from your employer? Enter or paste it below to get started.
              </p>
            </div>

            <div className="divider" />

            <div className="stack" style={{ gap: 12 }}>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)" }}>
                Invitation Link or Workplace Code
              </label>
              <JoinCodeForm autoFocus placeholder="Paste link or enter e.g. BWP-4821-102" buttonText="Join Workplace" />
            </div>

            <div className="divider" />

            <div className="stack" style={{ gap: 10 }}>
              <p className="section-label">Don&apos;t have Bizora installed?</p>
              <div className="store-badge-wrap">
                <PlayStoreBadge href={playStoreUrl} id="join-page-playstore-btn" />
              </div>
            </div>
          </div>

          <p className="footer">
            Bizora automated attendance &amp; workplace management.
          </p>
        </div>
      </div>
    </main>
  );
}
