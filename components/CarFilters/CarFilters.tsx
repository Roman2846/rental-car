"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { CarFilterValues } from "@/lib/types";
import styles from "./CarFilters.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/api";
import CustomSelect from "@/components/CustomSelect/CustomSelect";

interface CarFiltersProps {
  onSearch: (filters: CarFilterValues) => void;
}

const initialFilters: CarFilterValues = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export default function CarFilters({ onSearch }: CarFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(filters);
  }

  function handleReset() {
    setFilters(initialFilters);
    onSearch(initialFilters);
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="brand">Car brand</label>
          <CustomSelect
            value={filters.brand}
            placeholder="Choose a brand"
            options={brands}
            onChange={(brand) => setFilters((prev) => ({ ...prev, brand }))}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Price/ 1 hour</label>
          <CustomSelect
            value={filters.rentalPrice}
            placeholder="Choose a price"
            options={Array.from({ length: 19 }, (_, index) =>
              String((index + 1) * 10),
            )}
            onChange={(rentalPrice) =>
              setFilters((prev) => ({ ...prev, rentalPrice }))
            }
          />
        </div>

        <div className={styles.field}>
          <label>Car mileage / km</label>

          <div className={styles.mileage}>
            <input
              type="number"
              placeholder="From"
              aria-label="Mileage from"
              min="0"
              value={filters.minMileage}
              onChange={(event) =>
                setFilters({ ...filters, minMileage: event.target.value })
              }
            />

            <input
              type="number"
              placeholder="To"
              aria-label="Mileage to"
              min="0"
              value={filters.maxMileage}
              onChange={(event) =>
                setFilters({ ...filters, maxMileage: event.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.search} type="submit">
          Search
        </button>

        <button className={styles.clear} type="button" onClick={handleReset}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
