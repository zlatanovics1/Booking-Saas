import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true }),
        toast.success("Booking deleted successfully");
    },
    onError: () => toast.error("Could not delete the booking"),
  });

  return { mutate, isPending };
}
