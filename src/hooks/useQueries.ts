import { useQuery } from "@tanstack/react-query";
import usersApi from "../api/user";

export const useGetUsersQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.getAllUsers(),
  });
  return {
    users: data,
    isLoading,
    error,
  };
};
