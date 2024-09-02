import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["Cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
