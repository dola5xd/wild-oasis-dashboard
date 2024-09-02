import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSettings,
    onSuccess: () => {
      toast.success("Settings has been uptaded Succesfully!");
    },
    onError: () => toast.error("Settings Cant be uptaded!"),
    queryKey: ["Settings"],
  });

  return { settings, isLoading, error };
}
