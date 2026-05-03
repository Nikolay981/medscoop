import Database from 'better-sqlite3';
import path from 'path';

// Define the shape of our order
export interface Order {
  id?: number;
  name: string;
  phone: string;
  address: string;
  scoops: number;
  status: 'pending' | 'completed';
  createdAt?: string;
}

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), 'orders.db');
const db = new Database(dbPath);

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    scoops INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export function createOrder(order: Order) {
  const stmt = db.prepare(`
    INSERT INTO orders (name, phone, address, scoops, status)
    VALUES (@name, @phone, @address, @scoops, 'pending')
  `);
  return stmt.run(order);
}

export function getOrders(): Order[] {
  const stmt = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC');
  return stmt.all() as Order[];
}

export function updateOrderStatus(id: number, status: 'pending' | 'completed') {
  const stmt = db.prepare('UPDATE orders SET status = @status WHERE id = @id');
  return stmt.run({ id, status });
}
