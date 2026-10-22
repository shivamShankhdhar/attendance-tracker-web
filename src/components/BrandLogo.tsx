import Image from "next/image";

/** The official Bizora mark */
export function BizoraMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/bizora_logo.png"
      alt="Bizora Logo"
      width={size}
      height={size}
      style={{
        borderRadius: "24%",
        objectFit: "contain",
        display: "block",
        boxShadow: "0 2px 10px rgba(124, 58, 237, 0.28)",
      }}
      priority
    />
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
