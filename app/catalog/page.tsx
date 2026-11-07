"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import CarFilters from "@/components/CarFilters/CarFilters";
import CarCard from "@/components/CarCard/CarCard";
import NoCars from "@/components/NoCars/NoCars";
import LoadingCars from "@/components/LoadingCars/LoadingCars";

import { getCars } from "@/lib/api";
import type { CarFilterValues } from "@/lib/types";

import styles from "./page.module.css";

const initialFilters: CarFilterValues = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarFilterValues>(initialFilters);
  const [resetKey, setResetKey] = useState(0);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => getCars(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  function handleSearch(newFilters: CarFilterValues) {
    setFilters(newFilters);
  }

  function handleReset() {
    setFilters({ ...initialFilters });
    setResetKey((prev) => prev + 1);
  }

  return (
    <main className={styles.catalog}>
      <div className={styles.container}>
        <CarFilters key={resetKey} onSearch={handleSearch} />

        {isPending && <LoadingCars />}

        {isError && <p>Failed to load cars: {error.message}</p>}

        {!isPending && !isError && cars.length === 0 && (
          <NoCars onReset={handleReset} />
        )}

        {!isPending && !isError && cars.length > 0 && (
          <div className={styles.carsGrid}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {hasNextPage && !isError && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}
