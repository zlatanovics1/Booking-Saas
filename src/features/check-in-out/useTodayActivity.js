import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: todaysBookings, isLoading: isLoadingTodaysBookings } = useQuery(
    {
      queryKey: ["today's activity"],
      queryFn: getStaysTodayActivity,
    }
  );
  return { todaysBookings, isLoadingTodaysBookings };
}
