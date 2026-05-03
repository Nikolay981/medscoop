import { getOrders } from "@/lib/db";
import { AdminOrderActions, LogoutButton } from "./components";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const orders = await getOrders();

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary-dark)" }}>Табло за управление</h1>
        <LogoutButton />
      </div>

      <div className="glass" style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(2, 132, 199, 0.05)", borderBottom: "2px solid var(--border)" }}>
              <th style={{ padding: "1rem" }}>ID</th>
              <th style={{ padding: "1rem" }}>Дата</th>
              <th style={{ padding: "1rem" }}>Клиент</th>
              <th style={{ padding: "1rem" }}>Телефон</th>
              <th style={{ padding: "1rem" }}>Лъжички</th>
              <th style={{ padding: "1rem" }}>Адрес</th>
              <th style={{ padding: "1rem" }}>Статус</th>
              <th style={{ padding: "1rem" }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Няма поръчки все още.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem" }}>#{order.id}</td>
                  <td style={{ padding: "1rem" }}>{new Date(order.createdat!).toLocaleDateString('bg-BG')}</td>
                  <td style={{ padding: "1rem", fontWeight: "500" }}>{order.name}</td>
                  <td style={{ padding: "1rem" }}>{order.phone}</td>
                  <td style={{ padding: "1rem", fontWeight: "bold", color: "var(--primary-dark)" }}>{order.scoops} бр.</td>
                  <td style={{ padding: "1rem", maxWidth: "300px", wordBreak: "break-word" }}>{order.address}</td>
                  <td style={{ padding: "1rem" }}>
                    {order.status === 'pending' 
                      ? <span className="badge" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>Чакаща</span>
                      : <span className="badge" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--success)" }}>Завършена</span>
                    }
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <AdminOrderActions orderId={order.id!} status={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
