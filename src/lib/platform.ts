/**
 * Detects whether the user is on iOS or Android based on User-Agent.
 * Used to decide which store to redirect to.
 */
export function detectPlatform(ua: string): "ios" | "android" | "desktop" {
  const lower = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(lower)) return "ios";
  if (/android/.test(lower)) return "android";
  return "desktop";
}

/**
 * Returns the deep link URL that will open the join screen directly
 * in the Bizora app (for already-installed users).
 */
export function buildDeepLink(token: string): string {
  const scheme = process.env.NEXT_PUBLIC_APP_SCHEME || "bizora";
  return `${scheme}://join/${encodeURIComponent(token)}`;
}
