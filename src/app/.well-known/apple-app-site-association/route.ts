import { NextResponse } from "next/server";

/**
 * apple-app-site-association (AASA)
 *
 * This file tells iOS: "When a user taps a link to bizora.app/join/*,
 * open it directly in the Bizora app instead of Safari."
 *
 * Requirements:
 *  1. Must be served over HTTPS (Vercel handles this automatically).
 *  2. Content-Type must be "application/json" (no .json extension in URL).
 *  3. Fill APPLE_TEAM_ID and APPLE_BUNDLE_ID in your environment variables.
 *
 * In app.config.ts the mobile app already declares:
 *   ios.associatedDomains: ["applinks:bizora.app"]
 * which tells iOS to fetch and trust this file.
 */
export function GET() {
  const teamId = process.env.APPLE_TEAM_ID || "XXXXXXXXXX";
  const bundleId = process.env.APPLE_BUNDLE_ID || "com.yourcompany.bizora";

  const aasa = {
    applinks: {
      details: [
        {
          appIDs: [`${teamId}.${bundleId}`],
          components: [
            {
              // Match every path under /join/
              "/": "/join/*",
              comment: "Matches all workspace invitation links",
            },
          ],
        },
      ],
    },
  };

  return new NextResponse(JSON.stringify(aasa), {
    headers: {
      "Content-Type": "application/json",
      // Do not cache — iOS re-fetches this periodically
      "Cache-Control": "no-cache, no-store",
    },
  });
}
