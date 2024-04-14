import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    data: settings,
    isPending,
    mutate: updateSetting,
  } = useMutation({
    mutationKey: ["settings"],
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully"),
        queryClient.invalidateQueries(["settings"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { settings, isPending, updateSetting };
}
