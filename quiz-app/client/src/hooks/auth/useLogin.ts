import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { user } from "../../models/userType";
import APIClient from "../../services/api-client";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/useAuthStore";
import useGetme from "./useGetme";

const apiClient = new APIClient<user>("/users/login");

// Create a provider component

const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  try {
    const mutation = useMutation<any>(
      (existingUser: user) => apiClient.post(existingUser),
      {
        onSuccess: (received: any) => {
          if (!received) {
          } else {
            setToken(received.data);
          }
        },
        onError: () => {
          toast.error("Maybe you enter wrong password or email");
        },
      }
    );
    return mutation;
  } catch (error: any) {}
};

export default useLogin;
