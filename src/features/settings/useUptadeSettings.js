import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUptadeSettings() {
  const queryClint = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings has been uptaded Succesfully!");
      queryClint.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("Settings Cant be uptaded!"),
  });

  return { mutate, isLoading };
}
