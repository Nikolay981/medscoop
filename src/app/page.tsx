import styles from "./page.module.css";
import OrderForm from "./OrderForm";
import { PackageOpen, Sparkles, HeartPulse, Gift, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className="badge animate-fade-in delay-1" style={{ marginBottom: "1.5rem" }}>
          Идеалният подарък
        </div>
        <h1 className={`${styles.title} animate-fade-in delay-2`}>
          МедСкууп 💙
        </h1>
        <p className={`${styles.subtitle} animate-fade-in delay-3`}>
          Мистериозна кутия, пълна със сестрински артикули – практични, сладурски и полезни неща за ежедневието в болницата и извън нея.
        </p>
        <a href="#order" className="btn btn-primary animate-fade-in delay-3 mobileOnly">
          Поръчай сега
        </a>
      </header>

      <div className="container">
        <section className={`glass ${styles.card}`} style={{ marginBottom: "4rem" }}>
          <h2 className={styles.cardTitle}>
            <PackageOpen color="var(--primary)" /> Какво представлява?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            Съдържа 100% полезни и одобрени от сестри артикули. Струва по-малко от това да ги търсиш поединично и изключва риска от „скучен подарък“. Всяка кутия съдържа подбрани изненади като:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}><span className={styles.emoji}>✨</span> Аксесоари за работа</li>
            <li className={styles.listItem}><span className={styles.emoji}>✨</span> Медицински принадлежности</li>
            <li className={styles.listItem}><span className={styles.emoji}>✨</span> Персонални и тематични артикули</li>
            <li className={styles.listItem}><span className={styles.emoji}>✨</span> Малки подаръци за настроение</li>
          </ul>
          <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--primary-dark)", fontWeight: "500" }}>
            Никога не знаеш точно какво ще получиш… но знаеш, че ще бъде избрано с мисъл за теб 💙
          </p>
        </section>

        <div className={styles.contentGrid}>
          <div className={`glass ${styles.card}`}>
            <h3 className={styles.cardTitle}><HeartPulse color="var(--accent)" /> За кого е?</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}><CheckCircle2 size={20} color="var(--success)" /> За медицински сестри, които искат да се поглезят</li>
              <li className={styles.listItem}><CheckCircle2 size={20} color="var(--success)" /> За колежка – като мил жест без повод</li>
              <li className={styles.listItem}><CheckCircle2 size={20} color="var(--success)" /> За подарък за рожден ден</li>
              <li className={styles.listItem}><CheckCircle2 size={20} color="var(--success)" /> За завършване или започване на работа</li>
              <li className={styles.listItem}><CheckCircle2 size={20} color="var(--success)" /> За всеки, който иска да зарадва своя любима сестра</li>
            </ul>
          </div>
          <div id="order" className={`glass ${styles.card} ${styles.orderSection}`}>
            <h3 className={styles.cardTitle}><Gift color="var(--primary)" /> Поръчай своята кутия</h3>
            <OrderForm />
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} МедСкууп. Всички права запазени.</p>
      </footer>
    </main>
  );
}
