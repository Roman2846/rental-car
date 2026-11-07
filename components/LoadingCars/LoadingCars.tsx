import styles from "./LoadingCars.module.css";

export default function LoadingCars() {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.modal}>
        <div className={styles.spinner} aria-hidden="true" />

        <div className={styles.text}>
          <h2>Loading cars...</h2>
          <p>
            Please wait while we fetch the best
            <br />
            cars for you
          </p>
        </div>
      </div>
    </div>
  );
}
