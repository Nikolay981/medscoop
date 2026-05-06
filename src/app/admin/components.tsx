"use client";

import { useState } from "react";
import { markOrderCompleted, logoutAdmin, toggleOrderTickAction } from "@/app/actions";
import { Check, LogOut } from "lucide-react";

export function OrderTicks({ 
  orderId, 
  initialDone, 
  initialTaken, 
  initialSent, 
  initialUploaded 
}: { 
  orderId: number, 
  initialDone: boolean,
  initialTaken: boolean,
  initialSent: boolean,
  initialUploaded: boolean
}) {
  const [ticks, setTicks] = useState({
    is_done: initialDone,
    is_taken: initialTaken,
    is_sent: initialSent,
    is_uploaded: initialUploaded
  });

  const handleToggle = async (field: 'is_done' | 'is_taken' | 'is_sent' | 'is_uploaded') => {
    const newValue = !ticks[field];
    setTicks(prev => ({ ...prev, [field]: newValue }));
    try {
      await toggleOrderTickAction(orderId, field, newValue);
    } catch (e) {
      // Revert if error
      setTicks(prev => ({ ...prev, [field]: !newValue }));
      console.error(e);
    }
  };

  const tickStyle = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label style={tickStyle}>
        <input type="checkbox" checked={ticks.is_done} onChange={() => handleToggle('is_done')} />
        Направено
      </label>
      <label style={tickStyle}>
        <input type="checkbox" checked={ticks.is_sent} onChange={() => handleToggle('is_sent')} />
        Изпратено
      </label>
      <label style={tickStyle}>
        <input type="checkbox" checked={ticks.is_taken} onChange={() => handleToggle('is_taken')} />
        Взето
      </label>
      <label style={tickStyle}>
        <input type="checkbox" checked={ticks.is_uploaded} onChange={() => handleToggle('is_uploaded')} />
        Качено
      </label>
    </div>
  );
}

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
