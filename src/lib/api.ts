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
  const rawToken = (token || "").trim();
  if (!rawToken) return null;

  let base = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/$/, "");
  if (!base) {
    base = "https://www.attendance-tracker.shivamshankhdhar.online/api/v1";
  }

  // Ensure apiBase has /api/v1 prefix
  const apiBase = base.includes("/api/v1") ? base : `${base}/api/v1`;
  const cleanBase = base.replace(/\/api\/v1$/, "");

  // Candidate paths to try (plural /workplaces is standard in backend, singular /workplace is alias)
  const candidateUrls = [
    `${apiBase}/workplaces/join/${encodeURIComponent(rawToken)}`,
    `${apiBase}/workplace/join/${encodeURIComponent(rawToken)}`,
    `${cleanBase}/workplaces/join/${encodeURIComponent(rawToken)}`,
    `${cleanBase}/workplace/join/${encodeURIComponent(rawToken)}`,
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 15 }, // Cache for 15 seconds
      });
      if (res.ok) {
        const json = (await res.json()) as { success: boolean; data: any };
        if (json.success && json.data) {
          return {
            workplaceName: json.data.workplaceName || "Workplace",
            description: json.data.description,
            ownerName: json.data.ownerName || "Workplace Admin",
            activeMembersCount:
              typeof json.data.activeMembersCount === "number" ? json.data.activeMembersCount : 1,
            address: json.data.address,
          };
        }
      }
    } catch (err) {
      console.warn(`[fetchWorkspacePreview] Error fetching from ${url}:`, err);
    }
  }

  return null;
}
