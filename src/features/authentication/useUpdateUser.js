import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: UpdateCurrentUser, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      toast.success("User Has been Uptaded!");
      queryClient.setQueryData(["User"], user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { UpdateCurrentUser, isLoading };
}
