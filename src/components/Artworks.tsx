import React from "react";

/**
 * 1. Store in Envelope Artwork
 * Authentic Bizora workplace invite artwork: open envelope with workplace facade popping out and sparkles.
 */
export function StoreEnvelopeArtwork({ size = 140 }: { size?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Soft sage backdrop blob */}
        <circle cx="70" cy="72" r="56" fill="#EDF3DF" />

        {/* Sparkles around envelope */}
        <path d="M30 40L38 42" stroke="#6C7D38" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M110 40L102 42" stroke="#6C7D38" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M70 16L70 25" stroke="#6C7D38" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="26" cy="68" r="2.5" fill="#6C7D38" />
        <circle cx="114" cy="68" r="2.5" fill="#6C7D38" />

        {/* Storefront popping out of the open envelope */}
        <g transform="translate(44, 28)">
          {/* Main building wall */}
          <rect x="4" y="16" width="44" height="34" rx="4" fill="#FFFFFF" stroke="#5B692D" strokeWidth="2.2" />
          
          {/* Awning */}
          <path d="M0 16L5 7H47L52 16H0Z" fill="#5B692D" />
          <line x1="13" y1="7" x2="13" y2="16" stroke="#FFFFFF" strokeWidth="1.8" />
          <line x1="26" y1="7" x2="26" y2="16" stroke="#FFFFFF" strokeWidth="1.8" />
          <line x1="39" y1="7" x2="39" y2="16" stroke="#FFFFFF" strokeWidth="1.8" />
          
          {/* Windows / display */}
          <rect x="9" y="24" width="10" height="12" rx="2" fill="#EFF2E3" stroke="#5B692D" strokeWidth="1.5" />
          <rect x="33" y="24" width="10" height="12" rx="2" fill="#EFF2E3" stroke="#5B692D" strokeWidth="1.5" />
          
          {/* Doorway */}
          <rect x="21" y="26" width="10" height="24" rx="2" fill="#5B692D" />
        </g>

        {/* Open Envelope */}
        <g transform="translate(26, 52)">
          {/* Envelope Body */}
          <path
            d="M6 26 L44 54 L82 26 V72 C82 76.5 78.5 80 74 80 H14 C9.5 80 6 76.5 6 72 Z"
            fill="#6C7D38"
          />
          {/* Flap fold shadow */}
          <path
            d="M6 26 L44 54 L82 26"
            stroke="#536128"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Front Fold Accents */}
          <path
            d="M6 76 L32 46"
            stroke="#5B692D"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M82 76 L56 46"
            stroke="#5B692D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Small floating badge */}
        <g transform="translate(94, 76)">
          <circle cx="12" cy="12" r="12" fill="#40501E" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M8 12L11 15L16 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Storefront Shop Banner Artwork
 * Authentic storefront with striped awning, tree, display window, and clouds.
 */
export function StorefrontShopArtwork({ width = 320, height = 180 }: { width?: number; height?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 280 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background sage clouds */}
        <circle cx="218" cy="120" r="26" fill="#EDF3DF" />
        <circle cx="236" cy="126" r="18" fill="#EDF3DF" />
        <circle cx="226" cy="80" r="18" fill="#EDF3DF" opacity="0.7" />
        <circle cx="68" cy="100" r="22" fill="#EDF3DF" opacity="0.6" />

        {/* Ground Baseline */}
        <line x1="24" y1="150" x2="256" y2="150" stroke="#5B692D" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tree on the left */}
        <g>
          <line x1="50" y1="150" x2="50" y2="105" stroke="#5B692D" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="50" cy="100" rx="16" ry="24" fill="#EDF3DF" stroke="#5B692D" strokeWidth="2.5" />
          <line x1="50" y1="88" x2="50" y2="114" stroke="#5B692D" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Shop Building Facade */}
        <rect x="84" y="74" width="134" height="76" rx="2" fill="#FFFFFF" stroke="#5B692D" strokeWidth="2.5" />

        {/* Roof Cornice */}
        <rect x="88" y="56" width="126" height="8" rx="2" fill="#FFFFFF" stroke="#5B692D" strokeWidth="2.5" />

        {/* Striped Scalloped Awning */}
        <g>
          <path d="M90 64 L82 86 Q82 95 93 95 Q104 95 104 86 L109 64 Z" fill="#5B692D" stroke="#5B692D" strokeWidth="1.8" />
          <path d="M109 64 L104 86 Q104 95 116 95 Q126 95 126 86 L129 64 Z" fill="#FFFFFF" stroke="#5B692D" strokeWidth="1.8" />
          <path d="M129 64 L126 86 Q126 95 138 95 Q149 95 149 86 L149 64 Z" fill="#5B692D" stroke="#5B692D" strokeWidth="1.8" />
          <path d="M149 64 L149 86 Q149 95 161 95 Q172 95 172 86 L170 64 Z" fill="#FFFFFF" stroke="#5B692D" strokeWidth="1.8" />
          <path d="M170 64 L172 86 Q172 95 183 95 Q194 95 194 86 L190 64 Z" fill="#5B692D" stroke="#5B692D" strokeWidth="1.8" />
          <path d="M190 64 L194 86 Q194 95 205 95 Q215 95 215 86 L210 64 Z" fill="#FFFFFF" stroke="#5B692D" strokeWidth="1.8" />
        </g>

        {/* Shop Window */}
        <rect x="96" y="106" width="46" height="34" rx="2" fill="#EDF3DF" stroke="#5B692D" strokeWidth="2" />
        <line x1="119" y1="106" x2="119" y2="140" stroke="#5B692D" strokeWidth="1.5" />
        <line x1="96" y1="123" x2="142" y2="123" stroke="#5B692D" strokeWidth="1.5" />

        {/* Shop Doorway */}
        <rect x="156" y="102" width="28" height="48" rx="2" fill="#FFFFFF" stroke="#5B692D" strokeWidth="2" />
        <rect x="160" y="106" width="20" height="24" rx="2" fill="#EDF3DF" stroke="#5B692D" strokeWidth="1.5" />
        <circle cx="162" cy="134" r="1.8" fill="#5B692D" />

        {/* Small Bench / Planter on the right */}
        <rect x="194" y="132" width="16" height="18" rx="2" fill="#EDF3DF" stroke="#5B692D" strokeWidth="1.8" />
        <path d="M198 132 C198 126 206 126 206 132 Z" fill="#5B692D" />
      </svg>
    </div>
  );
}

/**
 * 3. Expired or Invalid Invite Artwork
 * Used in not-found.tsx: Document with warning / clock badge and neutral tones.
 */
export function ExpiredInviteArtwork({ size = 130 }: { size?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft coral/rose background circle */}
        <circle cx="65" cy="65" r="52" fill="#FDEAE7" />

        {/* Document Body */}
        <g transform="translate(38, 26)">
          <rect x="0" y="0" width="54" height="74" rx="6" fill="#FFFFFF" stroke="#BA3B2A" strokeWidth="2.2" />
          
          {/* Folded Top-Right Corner */}
          <path d="M38 0 L54 16 H42 C40 16 38 14 38 12 V0 Z" fill="#FDEAE7" stroke="#BA3B2A" strokeWidth="2" />
          
          {/* Content lines */}
          <line x1="10" y1="26" x2="34" y2="26" stroke="#E2E6D2" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="36" x2="44" y2="36" stroke="#E2E6D2" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="46" x2="28" y2="46" stroke="#E2E6D2" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="56" x2="38" y2="56" stroke="#E2E6D2" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Circular Warning / Clock Badge */}
        <g transform="translate(68, 68)">
          <circle cx="20" cy="20" r="18" fill="#BA3B2A" stroke="#FFFFFF" strokeWidth="3" />
          {/* Exclamation or clock hands */}
          <line x1="20" y1="12" x2="20" y2="21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="26" r="1.8" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
