import { useQuery } from "@tanstack/react-query";
import { fetchDestinations, type DestParams } from "../api/destinations";

export function useDestinations(params: DestParams) {
  return useQuery({
    queryKey: ["destinations", params],
    queryFn: () => fetchDestinations(params),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev
  });
}
