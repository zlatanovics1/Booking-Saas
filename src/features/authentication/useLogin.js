import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
}
