"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Rental<span className={styles.logoAccent}>Car</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className={styles.navigation}>
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={pathname === "/catalog" ? styles.active : ""}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
