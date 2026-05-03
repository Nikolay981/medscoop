import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div className="glass" style={{ maxWidth: "500px", padding: "3rem", borderRadius: "var(--radius-lg)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <CheckCircle size={64} color="var(--success)" className="animate-fade-in" />
        <h1 style={{ color: "var(--primary-dark)" }}>Благодарим за поръчката!</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
          Твоят МедСкууп е приет успешно. Ще се свържем с теб скоро за потвърждение.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Назад към началото
        </Link>
      </div>
    </div>
  );
}
