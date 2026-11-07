import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>

        <p className={styles.description}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
