import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClint = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckIn, mutate: checkIn } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked in sucessfuly!`);
      queryClint.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error(`Booking hasn't been checked in!`);
    },
  });
  return { isCheckIn, checkIn };
}
