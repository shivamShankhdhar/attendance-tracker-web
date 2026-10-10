/**
 * Fetches the public workspace preview from the backend.
 * Runs server-side or in Next.js API routes so credentials are secure.
 */
export interface WorkspacePreview {
  workplaceId?: string;
  workplaceName: string;
  workplaceCode?: string;
  description?: string;
  ownerName: string;
  activeMembersCount: number;
  address?: string;
  targetTeam?: {
    id: string;
    name: string;
    teamCode?: string;
    color?: string;
  } | null;
  installLink?: string;
  cleanToken?: string;
}

/**
 * Extracts a workplace code or invitation token from raw strings, full URLs, or deep links.
 * Handles:
 * - https://www.bizora.shivamshankhdhar.online/join?code=BWP-1234-567
 * - https://www.bizora.shivamshankhdhar.online/join/abc-123
 * - bizora://join?teamCode=TM123456
 * - bizora://join/509e-250a8
 * - Raw codes like "BWP-1234-567", "TM123456", "abc-123"
 */
export function extractCodeFromInput(rawInput: string): string {
  let tokenStr = (rawInput || "").trim();
  // Strip surrounding quotes or hash
  tokenStr = tokenStr.replace(/^["']|["']$/g, "").replace(/^#/, "").trim();
  if (!tokenStr) return "";

  // Handle custom app schemes like bizora://join?code=... or bizora://join/abc
  if (tokenStr.startsWith("bizora://")) {
    const pathPart = tokenStr.replace(/^bizora:\/\/join\/?/, "").replace(/^bizora:\/\//, "");
    if (pathPart && !pathPart.includes("?") && !pathPart.includes("=")) {
      try {
        return decodeURIComponent(pathPart);
      } catch {
        return pathPart;
      }
    }
  }

  // Handle query params like ?code=..., ?teamCode=..., ?token=..., ?invite=..., ?team=...
  if (
    tokenStr.includes("code=") ||
    tokenStr.includes("teamCode=") ||
    tokenStr.includes("token=") ||
    tokenStr.includes("invite=") ||
    tokenStr.includes("team=")
  ) {
    try {
      const normalized = tokenStr.replace(/^[a-zA-Z0-9+-.]+:\/\//, "http://dummy/");
      const url = new URL(normalized);
      const qToken =
        url.searchParams.get("code") ||
        url.searchParams.get("teamCode") ||
        url.searchParams.get("token") ||
        url.searchParams.get("invite") ||
        url.searchParams.get("team");
      if (qToken) return qToken.trim();
    } catch {
      const match = tokenStr.match(/(?:code|teamCode|token|invite|team)=([^&]+)/i);
      if (match && match[1]) {
        try {
          return decodeURIComponent(match[1]).trim();
        } catch {
          return match[1].trim();
        }
      }
    }
  }

  // Handle standard HTTP URL paths like /join/<token>
  try {
    const url = new URL(tokenStr.replace(/^[a-zA-Z0-9+-.]+:\/\//, "http://dummy/"));
    const match = url.pathname.match(/\/join\/([^/]+)\/?$/) || url.pathname.match(/\/workplace\/join\/([^/]+)\/?$/);
    if (match && match[1] && match[1] !== "dummy") {
      return decodeURIComponent(match[1]).trim();
    }
  } catch {
    // Keep raw string
  }

  return tokenStr;
}

export async function fetchWorkspacePreview(token: string): Promise<WorkspacePreview | null> {
  const cleanToken = extractCodeFromInput(token);
  const rawToken = (token || "").trim();
  if (!cleanToken && !rawToken) return null;

  let base = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/$/, "");
  if (!base) {
    base = "https://www.attendance-tracker.shivamshankhdhar.online/api/v1";
  }

  // Ensure apiBase has /api/v1 prefix
  const apiBase = base.includes("/api/v1") ? base : `${base}/api/v1`;
  const cleanBase = base.replace(/\/api\/v1$/, "");

  // Candidate tokens to query (cleaned token first, then raw token)
  const tokensToTry = Array.from(new Set([cleanToken, rawToken])).filter(Boolean);

  for (const t of tokensToTry) {
    // 1. Try GET /workplaces/join/:token (includes owner details and team)
    const candidateGetUrls = [
      `${apiBase}/workplaces/join/${encodeURIComponent(t)}`,
      `${apiBase}/workplace/join/${encodeURIComponent(t)}`,
      `${cleanBase}/workplaces/join/${encodeURIComponent(t)}`,
      `${cleanBase}/workplace/join/${encodeURIComponent(t)}`,
    ];

    for (const url of candidateGetUrls) {
      try {
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          next: { revalidate: 15 }, // Cache for 15 seconds
        });
        if (res.ok) {
          const json = (await res.json()) as { success: boolean; data: any };
          if (json.success && json.data) {
            return {
              workplaceId: json.data.workplaceId,
              workplaceName: json.data.workplaceName || "Workplace",
              workplaceCode: json.data.workplaceCode,
              description: json.data.description,
              ownerName: json.data.ownerName || "Workplace Admin",
              activeMembersCount:
                typeof json.data.activeMembersCount === "number" ? json.data.activeMembersCount : 1,
              address: json.data.address,
              targetTeam: json.data.targetTeam || null,
              installLink: json.data.installLink,
              cleanToken: t,
            };
          }
        }
      } catch (err) {
        console.warn(`[fetchWorkspacePreview] Error fetching GET from ${url}:`, err);
      }
    }

    // 2. Try POST /workplaces/join-landing (public join metadata)
    const candidatePostUrls = [
      `${apiBase}/workplaces/join-landing`,
      `${cleanBase}/workplaces/join-landing`,
    ];

    for (const url of candidatePostUrls) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token: t }),
          next: { revalidate: 15 },
        });
        if (res.ok) {
          const json = (await res.json()) as { success: boolean; data: any };
          if (json.success && json.data) {
            return {
              workplaceId: json.data.workplaceId,
              workplaceName: json.data.workplaceName || "Workplace",
              workplaceCode: json.data.workplaceCode,
              description: json.data.description,
              ownerName: json.data.ownerName || "Workplace Admin",
              activeMembersCount:
                typeof json.data.activeMembersCount === "number" ? json.data.activeMembersCount : 1,
              address: json.data.address,
              targetTeam: json.data.targetTeam || null,
              installLink: json.data.installLink,
              cleanToken: t,
            };
          }
        }
      } catch (err) {
        console.warn(`[fetchWorkspacePreview] Error fetching POST from ${url}:`, err);
      }
    }
  }

  return null;
}
