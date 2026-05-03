import { sql } from '@vercel/postgres';

export interface Order {
  id?: number;
  name: string;
  phone: string;
  address: string;
  scoops: number;
  status: 'pending' | 'completed';
  createdat?: string;
}

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      address TEXT NOT NULL,
      scoops INTEGER NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function createOrder(order: Order) {
  return sql`
    INSERT INTO orders (name, phone, address, scoops, status)
    VALUES (${order.name}, ${order.phone}, ${order.address}, ${order.scoops}, 'pending')
  `;
}

export async function getOrders(): Promise<Order[]> {
  const { rows } = await sql`SELECT * FROM orders ORDER BY createdat DESC`;
  return rows as Order[];
}

export async function updateOrderStatus(id: number, status: 'pending' | 'completed') {
  return sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}
