import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClint = useQueryClient();
  const { mutate: deleteBook, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success(`This booking has been deleted sucessfuly!`);
      queryClint.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error("Falid to Delete!");
    },
  });
  return { deleteBook, isLoading };
}
