import { sql } from '@vercel/postgres';

export interface Order {
  id?: number;
  name: string;
  phone: string;
  address: string;
  scoops: number;
  status: 'pending' | 'completed';
  createdat?: string;
  is_done?: boolean;
  is_taken?: boolean;
  is_sent?: boolean;
  is_uploaded?: boolean;
  notes?: string;
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

  // Add the new tick columns safely
  try {
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_done BOOLEAN DEFAULT false`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_taken BOOLEAN DEFAULT false`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_sent BOOLEAN DEFAULT false`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_uploaded BOOLEAN DEFAULT false`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT`;
  } catch (e) {
    console.error('Migration error:', e);
  }
}

export async function createOrder(order: Order) {
  return sql`
    INSERT INTO orders (name, phone, address, scoops, status, notes)
    VALUES (${order.name}, ${order.phone}, ${order.address}, ${order.scoops}, 'pending', ${order.notes || null})
  `;
}

export async function getOrders(): Promise<Order[]> {
  // Ensure DB is initialized to have columns
  try { await initDb(); } catch (e) {}

  const { rows } = await sql`SELECT * FROM orders ORDER BY createdat DESC`;
  return rows as Order[];
}

export async function updateOrderStatus(id: number, status: 'pending' | 'completed') {
  return sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}

export async function toggleOrderTick(id: number, field: 'is_done' | 'is_taken' | 'is_sent' | 'is_uploaded', value: boolean) {
  // We have to interpolate the column name manually because sql`` doesn't support dynamic column names easily,
  // but it's safe since field is strongly typed.
  if (field === 'is_done') return sql`UPDATE orders SET is_done = ${value} WHERE id = ${id}`;
  if (field === 'is_taken') return sql`UPDATE orders SET is_taken = ${value} WHERE id = ${id}`;
  if (field === 'is_sent') return sql`UPDATE orders SET is_sent = ${value} WHERE id = ${id}`;
  if (field === 'is_uploaded') return sql`UPDATE orders SET is_uploaded = ${value} WHERE id = ${id}`;
}

export async function deleteOrder(id: number) {
  return sql`DELETE FROM orders WHERE id = ${id}`;
}
