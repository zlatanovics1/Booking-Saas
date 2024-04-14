import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const currentBookingStatusFilter = searchParams.get("status");
  const currentBookingSort = searchParams.get("sortBy") || "startDate-desc";
  const currentPage = +searchParams.get("page") || 1;

  /// 1 API FILTER
  const filter =
    !currentBookingStatusFilter || currentBookingStatusFilter === "all"
      ? null
      : { field: "status", value: currentBookingStatusFilter };

  /// 2 API SORT
  const [field, direction] = currentBookingSort.split("-");
  const sortBy = { field, direction };
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings(filter, sortBy, currentPage),
  });

  const pageCount = Math.ceil(data?.count / RESULTS_PER_PAGE);
  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () => getBookings(filter, sortBy, currentPage + 1),
    });
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () => getBookings(filter, sortBy, currentPage - 1),
    });
  return { data, isLoading, error };
}
