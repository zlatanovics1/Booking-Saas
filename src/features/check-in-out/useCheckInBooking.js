import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function useCheckInBooking() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (booking) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...booking,
      }),
    onSuccess: () => {
      toast.success("Booking checked in successfully");
      queryClient.invalidateQueries({ active: true });
      navigate(`/bookings/${bookingId}`);
    },
    onError: () => toast.error("Could not check in the booking"),
  });
  return { isLoading: isPending, mutate };
}
