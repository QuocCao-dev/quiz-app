import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<Question>("/questions");

// Create a provider component

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  try {
    //useQuery
    const mutation = useMutation<Question>(
      (id: number) => apiClient.delete(id),
      {
        onSuccess: (response: Response) => {
          console.log(response);
        },
      }
    );
    return mutation;
  } catch (error: any) {
    console.log(error);
  }
};

export default useDeleteQuestion;