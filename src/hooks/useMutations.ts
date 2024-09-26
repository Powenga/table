import { useMutation } from "@tanstack/react-query";
import usersApi from "../api/user";
import { TUserCreateDTO } from "../types/user";

export const useAddUserMutation = (
  onSuccess?: (data: unknown) => void,
  onError?: () => void
) => {
  const mutation = useMutation({
    mutationFn: (user: TUserCreateDTO) => {
      return usersApi.addUser(user);
    },
    onSuccess,
    onError,
  });

  return {
    addUser: mutation.mutate,
    addUserStatus: mutation.status,
  };
};
