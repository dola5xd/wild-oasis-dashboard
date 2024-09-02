import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const Days = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), Days).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["Stays", `last ${Days}`],
  });

  const confirimedStays = stays?.filter(
    (stay) => stay.status !== "unconfirmed"
  );

  return { isLoading, confirimedStays, Days };
}
