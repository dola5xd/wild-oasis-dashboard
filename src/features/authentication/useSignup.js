import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: newAccount, isLoading } = useMutation({
    mutationFn: (email, password, fullName) =>
      signUp(email, password, fullName),
    onSuccess: () => {
      toast.success("Sign up Complete!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { newAccount, isLoading };
}
