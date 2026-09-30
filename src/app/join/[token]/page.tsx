import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchWorkspacePreview } from "@/lib/api";
import { detectPlatform } from "@/lib/platform";
import JoinPageClient from "./JoinPageClient";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const workspace = await fetchWorkspacePreview(token);
  if (!workspace) {
    return { title: "Invalid Invitation — Bizora" };
  }
  return {
    title: `Join ${workspace.workplaceName} — Bizora`,
    description: `You've been invited to join ${workspace.workplaceName} on Bizora. Download the app and join your team.`,
    openGraph: {
      title: `Join ${workspace.workplaceName} on Bizora`,
      description: `${workspace.activeMembersCount} members · Admin: ${workspace.ownerName}`,
      type: "website",
    },
  };
}

export default async function JoinPage({ params }: Props) {
  const { token } = await params;
  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  const platform = detectPlatform(ua);

  const workspace = await fetchWorkspacePreview(token);

  if (!workspace) {
    notFound();
  }

  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || "";
  const scheme = process.env.NEXT_PUBLIC_APP_SCHEME || "bizora";

  return (
    <JoinPageClient
      token={token}
      workspace={workspace}
      platform={platform}
      playStoreUrl={playStoreUrl}
      scheme={scheme}
    />
  );
}
