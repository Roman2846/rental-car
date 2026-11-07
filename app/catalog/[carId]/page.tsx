import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCarById } from "@/lib/api";
import styles from "./page.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default function CarDetailsPage({ params }: CarDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <main className={styles.details}>
          <div className={styles.loading}>
            <div
              className={styles.spinner}
              role="status"
              aria-label="Loading car details"
            />
          </div>
        </main>
      }
    >
      <CarDetailsContent params={params} />
    </Suspense>
  );
}

async function CarDetailsContent({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  let car;

  try {
    car = await getCarById(carId);
  } catch {
    notFound();
  }

  return (
    <main className={styles.details}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Image
            className={styles.carImage}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            preload
            unoptimized
          />

          <BookingForm carId={car.id} />
        </div>

        <div className={styles.carInfo}>
          <div className={styles.carHeader}>
            <div className={styles.titleRow}>
              <h1 className={styles.carTitle}>
                {car.brand} {car.model}, {car.year}
              </h1>

              <span className={styles.article}>Article: {car.stockNumber}</span>
            </div>

            <p className={styles.location}>
              {car.location.city}, {car.location.country}
            </p>

            <p className={styles.price}>${car.rentalPrice}</p>
          </div>

          <p className={styles.description}>{car.description}</p>

          <section className={styles.rentalConditions}>
            <h2 className={styles.sectionTitle}>Rental Conditions:</h2>

            <ul className={styles.conditionsList}>
              {car.rentalConditions.map((condition: string, index: number) => (
                <li key={index} className={styles.conditionItem}>
                  <Image src="/icons/check.svg" alt="" width={16} height={16} />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.specifications}>
            <h2 className={styles.sectionTitle}>Car Specifications:</h2>

            <ul className={styles.specificationsList}>
              <li>
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span>Year: {car.year}</span>
              </li>

              <li>
                <Image src="/icons/car.svg" alt="" width={16} height={16} />
                <span>Type: {car.type}</span>
              </li>

              <li>
                <Image src="/icons/fuel.svg" alt="" width={16} height={16} />
                <span>Fuel Consumption: {car.fuelConsumption}</span>
              </li>

              <li>
                <Image
                  src="/icons/settings.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span>Engine: {car.engine}</span>
              </li>

              <li>
                <Image src="/icons/mileage.svg" alt="" width={16} height={16} />
                <span>Mileage: {car.mileage} km</span>
              </li>
            </ul>
          </section>

          <section className={styles.features}>
            <h2 className={styles.sectionTitle}>Features</h2>

            <ul className={styles.featuresList}>
              {car.features.map((feature: string, index: number) => (
                <li key={index} className={styles.featureItem}>
                  <Image src="/icons/check.svg" alt="" width={16} height={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
