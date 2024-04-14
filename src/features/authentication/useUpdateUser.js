import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserData, isPending: isUpdating } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User data updated successfully");
    },
    onError: () => toast.error("Could not edit user data!"),
  });
  return { updateUserData, isUpdating };
}
