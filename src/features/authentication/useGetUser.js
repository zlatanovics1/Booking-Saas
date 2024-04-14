import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useGetUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
  //   console.log("role", user?.role);

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
