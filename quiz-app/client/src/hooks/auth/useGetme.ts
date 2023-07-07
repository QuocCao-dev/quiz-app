import { useMutation } from "@tanstack/react-query";
import { existingUser } from "../../models/userType";
import APIClient from "../../services/api-client";
import { getStoredUser } from "@/user_localStorage";

const apiClient = new APIClient("/users/me");

// Create a provider component

const useGetme = () => {
  const token = getStoredUser();
  return useMutation<existingUser, Error>({
    mutationFn: (token: string) => apiClient.postGetme(token),
    onSuccess: (received: null | existingUser) => {},
  });
};

export default useGetme;
