"use server";

import { createOrder } from "@/lib/db";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";

export async function submitOrder(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const scoops = parseInt(formData.get("scoops") as string, 10);

  if (!name || !phone || !address || !scoops) {
    throw new Error("Missing fields");
  }

  await createOrder({
    name,
    phone,
    address,
    scoops,
    status: 'pending'
  });

  redirect("/success");
}

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  if (password === "0883687058") {
    const cookieStore = await cookies();
    cookieStore.set("medscoop_admin", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    redirect("/admin");
  } else {
    throw new Error("Invalid password");
  }
}

export async function markOrderCompleted(id: number) {
  const { updateOrderStatus } = await import("@/lib/db");
  await updateOrderStatus(id, 'completed');
}

export async function toggleOrderTickAction(id: number, field: 'is_done' | 'is_taken' | 'is_sent' | 'is_uploaded', value: boolean) {
  const { toggleOrderTick } = await import("@/lib/db");
  await toggleOrderTick(id, field, value);
}

export async function deleteOrderAction(id: number) {
  const { deleteOrder } = await import("@/lib/db");
  await deleteOrder(id);
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("medscoop_admin");
  redirect("/admin/login");
}

