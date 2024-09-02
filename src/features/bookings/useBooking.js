import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking(id) {
  const {
    data: bookingData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBooking(id),
    queryKey: [`booking/${id}`],
  });

  return { isLoading, bookingData, error };
}
