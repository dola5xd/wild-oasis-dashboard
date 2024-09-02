import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClint = useQueryClient();

  const { isLoading: isCheckOut, mutate: checkOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked out sucessfuly!`);
      queryClint.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Booking hasn't been checked out!`);
    },
  });
  return { isCheckOut, checkOut };
}
