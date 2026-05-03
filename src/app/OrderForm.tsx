"use client";

import { useState } from "react";
import { submitOrder } from "./actions";
import styles from "./page.module.css";
import { ShoppingBag, User, Phone, MapPin } from "lucide-react";

export default function OrderForm() {
  const [scoops, setScoops] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prices = [
    { scoops: 1, price: "20€", label: "1 лъжичка" },
    { scoops: 2, price: "35€", label: "2 лъжички" },
    { scoops: 3, price: "50€", label: "3 лъжички" },
  ];

  return (
    <form 
      className={styles.form} 
      action={async (formData) => {
        setIsSubmitting(true);
        formData.append("scoops", scoops.toString());
        await submitOrder(formData);
      }}
    >
      <div className={styles.pricingSection}>
        <h2 className={styles.title}>Избери своя МедСкууп</h2>
        <div className={styles.pricingGrid}>
          {prices.map((p) => (
            <div 
              key={p.scoops}
              className={`${styles.priceCard} ${scoops === p.scoops ? styles.selected : ''}`}
              onClick={() => setScoops(p.scoops)}
            >
              <div className={styles.priceTitle}>{p.label}</div>
              <div className={styles.priceAmount}>{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="name"><User size={16} style={{display:'inline', marginBottom:'-3px'}}/> Имена</label>
        <input type="text" id="name" name="name" required placeholder="Иван Иванов" />
      </div>

      <div className="input-group">
        <label htmlFor="phone"><Phone size={16} style={{display:'inline', marginBottom:'-3px'}}/> Телефон</label>
        <input type="tel" id="phone" name="phone" required placeholder="08XX XXX XXX" />
      </div>

      <div className="input-group">
        <label htmlFor="address"><MapPin size={16} style={{display:'inline', marginBottom:'-3px'}}/> Адрес за доставка (Офис на куриер или точен адрес)</label>
        <textarea id="address" name="address" rows={3} required placeholder="Гр. София, ул. ..." />
      </div>

      <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isSubmitting}>
        <ShoppingBag size={20} />
        {isSubmitting ? "Изпращане..." : "Поръчай сега"}
      </button>
    </form>
  );
}
