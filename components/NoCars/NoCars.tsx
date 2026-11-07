import Image from "next/image";
import styles from "./NoCars.module.css";

interface NoCarsProps {
  onReset: () => void;
}

export default function NoCars({ onReset }: NoCarsProps) {
  return (
    <div className={styles.container}>
      <Image
        src="/images/no-cars.svg"
        alt="No cars found"
        width={414}
        height={388}
        className={styles.image}
      />

      <h2 className={styles.title}>No cars found</h2>

      <p className={styles.description}>
        We couldn&apos;t find any cars that match your current filters. Try
        changing your search criteria or reset the filters.
      </p>

      <button type="button" className={styles.button} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
