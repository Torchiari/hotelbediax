import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DataSelector({
  q,
  setQ,
  filters,
  setFilters
}: {
  q: string;
  setQ: (v: string) => void;
  filters: {
    country?: string;
    region?: string;
    ratingMin?: number;
    ratingMax?: number;
    sortBy?: string;
  };
  setFilters: (v: any) => void;
}) {
  const [localQ, setLocalQ] = useState(q);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => setLocalQ(q), [q]);
  useEffect(() => setLocalFilters(filters), [filters]);

  const validateAndSet = (updated: any) => {
    const { ratingMin, ratingMax, country, region } = updated;

    if (country && country.length > 30) {
      toast.error("❌ El país no puede exceder 30 caracteres.");
      return;
    }

    if (region && region.length > 30) {
      toast.error("❌ La región no puede exceder 30 caracteres.");
      return;
    }

    if (ratingMin !== undefined && (ratingMin < 0 || ratingMin > 5)) {
      toast.error("❌ Min Rating debe estar entre 0 y 5");
      return;
    }

    if (ratingMax !== undefined && (ratingMax < 0 || ratingMax > 5)) {
      toast.error("❌ Max Rating debe estar entre 0 y 5");
      return;
    }

    if (
      ratingMin !== undefined &&
      ratingMax !== undefined &&
      ratingMin > ratingMax
    ) {
      toast.error("❌ Min Rating no puede ser mayor que Max Rating");
      return;
    }

    setLocalFilters(updated);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setQ(localQ);

      setFilters({
        ...localFilters,
        ratingMin:
          localFilters.ratingMin === null || localFilters.ratingMin === 0
            ? undefined
            : localFilters.ratingMin,
        ratingMax:
          localFilters.ratingMax === null || localFilters.ratingMax === 0
            ? undefined
            : localFilters.ratingMax
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [localQ, localFilters, setQ, setFilters]);

  return (
    <aside className="w-60 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-md">
      <h2 className="text-gray-600 font-semibold text-lg">Filters</h2>

      {/* Search */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Search</label>
        <input
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      {/* Country */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Country</label>
        <input
          value={localFilters.country ?? ""}
          onChange={(e) =>
            validateAndSet({
              ...localFilters,
              country: e.target.value || undefined
            })
          }
          placeholder="Country"
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      {/* Region */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Region</label>
        <input
          value={localFilters.region ?? ""}
          onChange={(e) =>
            validateAndSet({
              ...localFilters,
              region: e.target.value || undefined
            })
          }
          placeholder="Region"
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      {/* Rating Min */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Min Rating</label>
        <input
          type="number"
          step="0.1"
          min={0}
          max={5}
          value={localFilters.ratingMin ?? ""}
          onChange={(e) =>
            validateAndSet({
              ...localFilters,
              ratingMin:
                e.target.value === "" ? undefined : Number(e.target.value)
            })
          }
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      {/* Rating Max */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Max Rating</label>
        <input
          type="number"
          step="0.1"
          min={0}
          max={5}
          value={localFilters.ratingMax ?? ""}
          onChange={(e) =>
            validateAndSet({
              ...localFilters,
              ratingMax:
                e.target.value === "" ? undefined : Number(e.target.value)
            })
          }
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Sort by</label>
        <select
          value={localFilters.sortBy ?? "name"}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, sortBy: e.target.value })
          }
          className="px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
        >
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="createdAt">Created date</option>
          <option value="updatedAt">Updated date</option>
        </select>
      </div>
    </aside>
  );
}
