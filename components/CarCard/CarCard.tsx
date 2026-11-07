import Image from "next/image";
import Link from "next/link";
import styles from "./CarCard.module.css";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  rentalPrice: string;
  img: string;
  location: {
    city: string;
    country: string;
    address: string;
  };
  rentalCompany: string;
  type: string;
  mileage: number;
  description: string;
  rentalConditions: string[];
  fuelConsumption: string;
  engine: string;
  features: string[];
  stockNumber: number;
}

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const city = car.location.city;
  const country = car.location.country;

  return (
    <article className={styles.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={244}
        height={268}
        className={styles.image}
        unoptimized
      />

      <div className={styles.heading}>
        <h3 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h3>

        <span className={styles.price}>${car.rentalPrice}</span>
      </div>

      <div className={styles.details}>
        <div className={styles.detailsRow}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
        </div>

        <div className={styles.detailsRow}>
          <span>{car.type}</span>
          <span>{car.mileage.toLocaleString("en-US")} km</span>
        </div>
      </div>

      <Link href={`/catalog/${car.id}`} className={styles.button}>
        Read more
      </Link>
    </article>
  );
}
