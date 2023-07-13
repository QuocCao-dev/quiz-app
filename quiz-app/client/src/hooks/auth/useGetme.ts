import { useMutation } from "@tanstack/react-query";
import { existingUser } from "../../models/userType";
import APIClient from "../../services/api-client";
import { getStoredUser } from "@/user_localStorage";
import { useAuthStore } from "@/zustand/useAuthStore";

const apiClient = new APIClient("/users/me");

// Create a provider component

const useGetme = () => {
  const token = getStoredUser();
  const setUser = useAuthStore((state) => state.setUser);

  try {
    const mutation = useMutation<existingUser, Error>({
      mutationFn: (token: string) => apiClient.postGetme(token),
      onSuccess: (received: null | existingUser) => {
        setUser(received?.data);
      },
    });
    return mutation;
  } catch (error: any) {}
};

export default useGetme;
