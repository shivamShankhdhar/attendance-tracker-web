/**
 * Fetches the public workspace preview from the backend.
 * Runs server-side so no API key is exposed to the browser.
 */
export interface WorkspacePreview {
  workplaceName: string;
  description?: string;
  ownerName: string;
  activeMembersCount: number;
  address?: string;
}

export async function fetchWorkspacePreview(token: string): Promise<WorkspacePreview | null> {
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const res = await fetch(`${base}/workplace/join/${encodeURIComponent(token)}`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    });
    if (!res.ok) return null;
    const json = await res.json() as { success: boolean; data: WorkspacePreview };
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}
