import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClint = useQueryClient();

  const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabins(id),
    onSuccess: () => {
      toast.success("Cabin has been deleted Successfuly!");
      queryClint.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: () => toast.error("Falid to Delete!"),
  });

  return { isDeleteing, deleteCabin };
}
