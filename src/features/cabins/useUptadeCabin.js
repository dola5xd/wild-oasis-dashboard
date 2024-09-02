import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUptadeCabin() {
  const queryClint = useQueryClient();

  const { mutate: editingCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success("Cabin has been uptaded Succesfully!");
      queryClint.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: () => toast.error("Falid to create new cabin!"),
  });

  return { editingCabin, isEditing };
}
