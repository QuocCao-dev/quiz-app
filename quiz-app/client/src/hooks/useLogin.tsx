import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { user } from "../models/userType";
import APIClient from "../services/api-client";
import { clearStoredUser, setStoredUser } from "../user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<user>("/users/login");

// Create a provider component

const useLogin = () => {
  return useMutation<user, Error>({
    mutationFn: (existingUser: user) => apiClient.post(existingUser),
    onSuccess: (received: null | user) => {
      if (!received) {
        clearStoredUser();
      } else {
        setStoredUser(received?.data);
      }
    },
    onError: () => {
     toast.error('Maybe you enter wrong password or email')
    },
  });
};

export default useLogin;
