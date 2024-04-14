import { useSearchParams } from "react-router-dom";
import { DEFAULT_RECENT_DAYS } from "../../utils/constants";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const days = +searchParams.get("last") || DEFAULT_RECENT_DAYS;
  const date = subDays(new Date(), days).toISOString();

  const { data: recentStays, isLoading: isLoadingRecentStays } = useQuery({
    queryKey: ["stays", `last-${days}`],
    queryFn: () => getStaysAfterDate(date),
  });
  const confirmedRecentStays = recentStays?.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );

  return { recentStays, confirmedRecentStays, isLoadingRecentStays, days };
}
