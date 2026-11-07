import type { Car } from "@/components/CarCard/CarCard";
import type { CarFilterValues } from "@/lib/types";

const BASE_URL = "https://car-rental-api.goit.study";

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export async function getCars(
  page = 1,
  filters?: CarFilterValues,
): Promise<CarsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: "12",
  });

  if (filters?.brand) {
    params.set("brand", filters.brand);
  }

  if (filters?.rentalPrice) {
    params.set("price", filters.rentalPrice);
  }

  if (filters?.minMileage) {
    params.set("minMileage", filters.minMileage);
  }

  if (filters?.maxMileage) {
    params.set("maxMileage", filters.maxMileage);
  }

  const response = await fetch(`${BASE_URL}/cars?${params.toString()}`);

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API ${response.status}: ${details}`);
  }

  return response.json();
}

export async function getBrands(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/cars/filters`);

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  const data: { brands: string[] } = await response.json();

  return data.brands;
}

export async function getCarById(id: string): Promise<Car> {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch car");
  }

  return response.json();
}
