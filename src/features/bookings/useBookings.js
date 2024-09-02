import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClint = useQueryClient();

  const filterValue = searchParams.get("status") || "all";
  const sortValue = searchParams.get("sort") || "startDate-desc";

  // FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { type: "status", value: filterValue };

  // SORT
  const sort = !sortValue
    ? null
    : {
        field: sortValue.split("-")[0],
        direction: sortValue.split("-")[1],
      };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  //PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page > 1)
    queryClint.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });

  if (page < pageCount)
    queryClint.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  return { isLoading, bookings, error, count };
}
