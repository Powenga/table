import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../utils/config";
import type { IUser } from "../types/user";

export const onSuccess = <T>(response: AxiosResponse<T>) =>
  Promise.resolve(response.data);

export const onError = (error: AxiosError<{ message?: string }>) => {
  return Promise.reject(error);
};

const apiInstance = axios.create({
  baseURL: API_URL,
});

const usersApi = {
  getAllUsers: () =>
    apiInstance.get<IUser[]>("/users").then(onSuccess).catch(onError),
};

export default usersApi;
