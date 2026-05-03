"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [error, action, isPending] = useActionState(async (state: any, formData: FormData) => {
    try {
      await loginAdmin(formData);
      return null;
    } catch (e: any) {
      return e.message;
    }
  }, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <form action={action} className="glass" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Lock size={48} color="var(--primary)" style={{ margin: "0 auto 1rem" }} />
          <h1 style={{ color: "var(--primary-dark)", fontSize: "1.75rem" }}>Админ Панел</h1>
          <p style={{ color: "var(--text-muted)" }}>Вход в системата</p>
        </div>

        <div className="input-group">
          <label htmlFor="password">Парола</label>
          <input type="password" id="password" name="password" required />
        </div>

        {error && (
          <div style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {error === "Invalid password" ? "Грешна парола" : "Възникна грешка"}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Влизане..." : "Вход"}
        </button>
      </form>
    </div>
  );
}
