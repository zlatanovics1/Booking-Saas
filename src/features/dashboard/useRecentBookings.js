import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { DEFAULT_RECENT_DAYS } from "../../utils/constants";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const days = +searchParams.get("last") || DEFAULT_RECENT_DAYS;
  const date = subDays(new Date(), days).toISOString();

  const { data: recentBookings, isLoading: isLoadingRecentBookings } = useQuery(
    {
      queryKey: ["bookings", `last-${days}`],
      queryFn: () => getBookingsAfterDate(date),
    }
  );

  return { recentBookings, isLoadingRecentBookings };
}
