/** The real Bizora mark SVG — matches frontend/assets/brand/bizora-mark.svg */
export function BizoraMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#3B5724"/>
      <rect x="12" y="11" width="5.5" height="26" rx="2.75" fill="#FFFFFF"/>
      <path d="M15 14H26C29.8 14 32.5 16.2 32.5 19C32.5 21.8 29.8 24 26 24H15" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 24H27.5C31.5 24 34.5 26.3 34.5 29.5C34.5 32.7 31.5 34 27.5 34H15" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15" cy="14" r="2.5" fill="#FFFFFF"/>
      <circle cx="15" cy="24" r="2.5" fill="#FFFFFF"/>
      <circle cx="15" cy="34" r="2.5" fill="#FFFFFF"/>
      <circle cx="26" cy="19" r="2.5" fill="#E5A93C"/>
      <circle cx="20" cy="24" r="2.8" fill="#E5A93C"/>
    </svg>
  );
}

/** Full wordmark: mark + "Bizora" + "WORKFORCE ATTENDANCE OS" */
export function BizoraWordmark() {
  return (
    <div className="logo-bar">
      <BizoraMark size={40} />
      <div>
        <div className="logo-name">Bizora</div>
        <div className="logo-tagline">Workforce Attendance OS</div>
      </div>
    </div>
  );
}

/** Inline icon-only mark for use in small spaces */
export function BizoraMarkSmall() {
  return <BizoraMark size={32} />;
}
