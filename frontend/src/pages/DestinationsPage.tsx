"use client"

import { useState } from "react";
import DataSelector from "../components/DataSelector";
import DestinationsTable from "../components/DestinationsTable";
import { useDestinations } from "../hooks/useDestinations";

export default function DestinationsPage() {
  const [q, setQ] = useState<string>("");
  const [filters, setFilters] = useState<{
    country?: string;
    region?: string;
    ratingMin?: number;
    ratingMax?: number;
    sortBy?: string;
  }>({
    country: undefined,
    region: undefined,
    ratingMin: undefined,
    ratingMax: undefined,
    sortBy: "name"
  });

  const [page, setPage] = useState<number>(1);
  const pageSize = 50;

  // Usamos directamente page, q y filters
  const { data, isLoading, isError } = useDestinations({
    q,
    page,
    pageSize,
    country: filters.country,
    region: filters.region,
    ratingMin: filters.ratingMin,
    ratingMax: filters.ratingMax,
    sortBy: filters.sortBy
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Destinations</h1>
      </header>

      <div className="flex gap-6">
        <DataSelector
          q={q}
          setQ={setQ}
          filters={filters}
          setFilters={setFilters}
        />

        <section className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
          {isLoading && <div className="text-center py-6 text-gray-500">Loading...</div>}
          {isError && <div className="text-center py-6 text-red-500">Error loading destinations</div>}

          {!isLoading && !isError && (
            <>
              <DestinationsTable
                items={items}
                total={total}
                onRefresh={() => {}}
                page={page}
                pageSize={pageSize}
              />

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>

                <span className="px-3 py-1">{page} / {totalPages}</span>

                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={page === totalPages || total === 0}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
