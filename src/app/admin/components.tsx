"use client";

import { useState } from "react";
import { markOrderCompleted, logoutAdmin } from "@/app/actions";
import { Check, LogOut } from "lucide-react";

export function AdminOrderActions({ orderId, status }: { orderId: number, status: string }) {
  const [isPending, setIsPending] = useState(false);

  if (status === 'completed') {
    return <span className="badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--success)" }}>Завършена</span>;
  }

  return (
    <button 
      className="btn" 
      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", background: "var(--primary)", color: "white" }}
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        await markOrderCompleted(orderId);
        window.location.reload();
      }}
    >
      <Check size={16} />
      {isPending ? "..." : "Маркирай"}
    </button>
  );
}

export function LogoutButton() {
  return (
    <button 
      className="btn" 
      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", background: "transparent", border: "1px solid var(--border)", color: "var(--text-main)" }}
      onClick={async () => {
        await logoutAdmin();
      }}
    >
      <LogOut size={16} />
      Изход
    </button>
  );
}
