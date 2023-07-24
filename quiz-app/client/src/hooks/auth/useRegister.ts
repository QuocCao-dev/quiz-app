import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../models/userType";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<registerUser>("/users/register");

// Create a provider component

const useRegister = () => {
  const queryClient = new QueryClient();
  try {
    const mutation = useMutation<registerUser, Error>(
      (newUser: registerUser) => apiClient.post(newUser),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["register"]);
        },
        onError: () => {},
      }
    );
    return mutation;
  } catch (error: any) {}
};

export default useRegister;
