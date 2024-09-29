import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../../shared/api/user";
import { TUserCreateDTO } from "../../../shared/api/user";
import { GET_USERS_QUERY_KEY } from "./useQueries";

interface ICallbacks {
  onSuccess?: (data?: unknown) => void;
  onError?: () => void;
  onSettled?: () => void;
}

export const useAddUserMutation = ({
  onSuccess,
  onError,
  onSettled,
}: ICallbacks) => {
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
    onSettled,
  });

  return {
    addUser: mutation.mutate,
    addUserStatus: mutation.status,
  };
};

export const useDeleteUsersMutation = ({
  onSuccess,
  onError,
  onSettled,
}: ICallbacks) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (idList: string[]) => {
      return usersApi.delteUsers(idList);
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
    },
    onError,
    onSettled,
  });

  return {
    deleteUsers: mutation.mutate,
    deleteUsersStatus: mutation.status,
  };
};
