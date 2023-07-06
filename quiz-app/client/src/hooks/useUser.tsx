import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../user_localStorage";
import APIClient, { FetchResponse } from "../services/api-client";
import { user } from "../models/userType";

// query function
// async function getUser(
//   user: any | null,
//   signal: AbortSignal
// ): Promise<any | null> {
//   if (!user) return null;
//   const { data }: AxiosResponse<{ user: any }> = await axiosInstance.get(
//     `/user/${user.id}`,
//     {
//       signal, // abortSignal from React Query
//       headers: getJWTHeader(user),
//     }
//   );

//   return data.user;
// }
const apiClient = new APIClient<user>("/users/me");

interface UseUser {
  user: any | null;
  updateUser: (user: any) => void;
  clearUser: () => void;
}

export function useUser(): any {
  const queryClient = useQueryClient();

  // call useQuery to update user data from server
  const { data: user } = useQuery<FetchResponse<user> | any>({
    queryKey: ["user_getme" ],
    queryFn: () => apiClient.get(),
  })

  // meant to be called from useAuth
  function updateUser(newUser: any): void {
    // update the user
    queryClient.setQueryData("user", newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // reset user to null
    queryClient.setQueryData("user", null);
  }

  return { user, updateUser, clearUser };
}
