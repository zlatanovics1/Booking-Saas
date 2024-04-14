import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { isPending, mutate };
}
