import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiLogin";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: getUser,
  });

  return { user, isLoading, isAuth: user?.role === "authenticated" };
}
