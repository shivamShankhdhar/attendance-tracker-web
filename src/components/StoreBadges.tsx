import { IoLogoGooglePlaystore } from "react-icons/io5";

/**
 * Google Play download button.
 * Uses official brand color (#01875f), <IoLogoGooglePlaystore />,
 * and spans full width with proportional typography.
 */
export function PlayStoreBadge({ href, id }: { href: string; id?: string }) {
  return (
    <a
      href={href}
      id={id}
      target="_blank"
      rel="noopener noreferrer"
      className="playstore-btn"
      aria-label="Get it on Google Play"
    >
      <IoLogoGooglePlaystore className="playstore-icon" />
      <div className="playstore-text">
        <span className="playstore-sub">GET IT ON</span>
        <span className="playstore-main">Google Play</span>
      </div>
    </a>
  );
}
