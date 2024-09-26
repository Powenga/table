import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersApi from "../api/user";
import { TUserCreateDTO } from "../types/user";
import { GET_USERS_QUERY_KEY } from "./useQueries";

export const useAddUserMutation = (
  onSuccess?: (data?: unknown) => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: TUserCreateDTO) => {
      return usersApi.addUser(user);
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
    },
    onError,
  });

  return {
    addUser: mutation.mutate,
    addUserStatus: mutation.status,
  };
};
