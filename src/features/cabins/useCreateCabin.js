import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClint = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin has been created Succesfully!");
      queryClint.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: () => toast.error("Falid to create new cabin!"),
  });

  return { createCabin, isCreating };
}
