import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "User created successfully! Please verify the account from the user's email."
      );
    },
  });
  return { mutate, isPending };
}
