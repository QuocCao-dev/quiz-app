import { useMutation, useQuery } from "@tanstack/react-query";
import { existingUser } from "../../models/userType";
import APIClient from "../../services/api-client";
import { useAuthStore } from "@/zustand/useAuthStore";

const apiClient = new APIClient("/users/me");

// Create a provider component

const useGetme = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  try {
    //useQuery
    const query = useQuery<any>(["me"], () => apiClient.postGetme(token!), {
      onSuccess: (received: null | existingUser) => {
        setUser(received);
      },
      enabled: Boolean(token),
    });
    return query;
  } catch (error: any) {}
};

export default useGetme;
