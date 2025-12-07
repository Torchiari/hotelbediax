const API_BASE = "http://localhost:5113/api/Destinations";

export type DestParams = {
  q?: string;
  page?: number;
  pageSize?: number;
  country?: string;
  region?: string;
  ratingMin?: number;
  ratingMax?: number;
  sortBy?: string;
};

export async function fetchDestinations(params: DestParams = {}) {
  const query = new URLSearchParams();

  if (params.q) query.append("q", params.q);
  if (params.page !== undefined) query.append("page", String(params.page));
  if (params.pageSize !== undefined) query.append("pageSize", String(params.pageSize));
  if (params.country) query.append("country", params.country);
  if (params.region) query.append("region", params.region);
  if (params.ratingMin !== undefined) query.append("ratingMin", String(params.ratingMin));
  if (params.ratingMax !== undefined) query.append("ratingMax", String(params.ratingMax));
  if (params.sortBy) query.append("sortBy", params.sortBy);

  const res = await fetch(`${API_BASE}?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to load destinations");
  return res.json();
}

export async function createDestination(payload: any) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create destination");
  return res.json();
}

export async function updateDestination(id: string, payload: any) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update destination");
  return res;
}

export async function deleteDestination(id: string) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete destination");
  return res;
}
