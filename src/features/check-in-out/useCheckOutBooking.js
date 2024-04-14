import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOutBooking() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Booking checked out successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Could not check out the booking"),
  });
  return { isLoading: isPending, mutate };
}
