import { useQuery } from "@tanstack/react-query";
import usersApi from "../api/user";

export const GET_USERS_QUERY_KEY = "users/get";

export const useGetUsersQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: () => usersApi.getAllUsers(),
  });
  return {
    users: data,
    isLoading,
    error,
  };
};
