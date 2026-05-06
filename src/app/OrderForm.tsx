"use client";

import { useState, useEffect } from "react";
import { submitOrder } from "./actions";
import styles from "./page.module.css";
import { ShoppingBag, User, Phone, MapPin, Truck } from "lucide-react";

type DeliveryMethod = "address" | "econt" | "speedy";

export default function OrderForm() {
  const [scoops, setScoops] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("econt");
  const [econtOffices, setEcontOffices] = useState<{name: string, address: string}[]>([]);
  const [addressValue, setAddressValue] = useState("");

  useEffect(() => {
    // Fetch Econt offices on mount
    fetch('https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode: 'BGR' })
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.offices) {
        const mapped = data.offices.map((o: any) => ({
          name: o.name,
          address: o.address?.fullAddress || ""
        }));
        setEcontOffices(mapped);
      }
    })
    .catch(err => console.error("Failed to load Econt offices:", err));
  }, []);

  const prices = [
    { scoops: 1, price: "20€", label: "1 лъжичка" },
    { scoops: 2, price: "35€", label: "2 лъжички" },
    { scoops: 3, price: "50€", label: "3 лъжички" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOffices = addressValue 
    ? econtOffices.filter(o => (`${o.name} - ${o.address}`).toLowerCase().includes(addressValue.toLowerCase())).slice(0, 50)
    : econtOffices.slice(0, 50);

  return (
    <form 
      className={styles.form} 
      action={async (formData) => {
        setIsSubmitting(true);
        formData.append("scoops", scoops.toString());
        
        // Format the address field correctly before sending to the server
        let finalAddress = "";
        if (deliveryMethod === "econt") {
          finalAddress = `Еконт: ${addressValue}`;
        } else if (deliveryMethod === "speedy") {
          finalAddress = `Спиди: ${addressValue}`;
        } else {
          finalAddress = `Адрес: ${addressValue}`;
        }
        
        // Set the modified address
        formData.set("address", finalAddress);

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
        <label><Truck size={16} style={{display:'inline', marginBottom:'-3px'}}/> Начин на доставка</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <input 
              type="radio" 
              name="deliveryMethod" 
              value="econt" 
              style={{ margin: 0 }}
              checked={deliveryMethod === "econt"} 
              onChange={() => { setDeliveryMethod("econt"); setAddressValue(""); }} 
            />
            До офис на Еконт
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <input 
              type="radio" 
              name="deliveryMethod" 
              value="speedy" 
              style={{ margin: 0 }}
              checked={deliveryMethod === "speedy"} 
              onChange={() => { setDeliveryMethod("speedy"); setAddressValue(""); }} 
            />
            До офис на Спиди
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <input 
              type="radio" 
              name="deliveryMethod" 
              value="address" 
              style={{ margin: 0 }}
              checked={deliveryMethod === "address"} 
              onChange={() => { setDeliveryMethod("address"); setAddressValue(""); }} 
            />
            До личен адрес
          </label>
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        {deliveryMethod === "econt" && (
          <>
            <label htmlFor="addressInput"><MapPin size={16} style={{display:'inline', marginBottom:'-3px'}}/> Избери офис на Еконт</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                id="addressInput"
                required 
                placeholder="Започни да въвеждаш град или име на офис..." 
                value={addressValue}
                onChange={(e) => {
                  setAddressValue(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                autoComplete="off"
              />
              {isDropdownOpen && filteredOffices.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  zIndex: 50,
                  listStyle: 'none',
                  padding: 0,
                  margin: '0.25rem 0 0 0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}>
                  {filteredOffices.map((office, idx) => (
                    <li 
                      key={idx}
                      style={{ padding: '0.75rem', cursor: 'pointer', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '0.875rem' }}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent onBlur from firing before click is processed
                        setAddressValue(`${office.name} - ${office.address}`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <strong>{office.name}</strong><br/>
                      <span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>{office.address}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        
        {deliveryMethod === "speedy" && (
          <>
            <label htmlFor="addressInput"><MapPin size={16} style={{display:'inline', marginBottom:'-3px'}}/> Въведи град и офис на Спиди</label>
            <textarea 
              id="addressInput"
              rows={2} 
              required 
              placeholder="Гр. София, офис Спиди - Лозенец..." 
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
            />
          </>
        )}

        {deliveryMethod === "address" && (
          <>
            <label htmlFor="addressInput"><MapPin size={16} style={{display:'inline', marginBottom:'-3px'}}/> Въведи точен адрес</label>
            <textarea 
              id="addressInput"
              rows={3} 
              required 
              placeholder="Гр. София, ул. ..." 
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
            />
          </>
        )}
      </div>

      <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isSubmitting}>
        <ShoppingBag size={20} />
        {isSubmitting ? "Изпращане..." : "Поръчай сега"}
      </button>
    </form>
  );
}
