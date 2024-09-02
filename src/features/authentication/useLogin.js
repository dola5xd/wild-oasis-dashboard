import { useMutation } from "@tanstack/react-query";
import { Login } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => Login({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("error: ", error);
      toast.error("Your Email or Passwoard is incorrect");
    },
  });

  return { login, isLoading };
}
