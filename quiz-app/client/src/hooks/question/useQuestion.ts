import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<Question>("/questions");

// Create a provider component

const useAddQuestion = () => {
  const queryClient = useQueryClient();
  try {
    //useQuery
    const mutation = useMutation<Question>(
      (data: Question) => apiClient.get(data),
      {
        onSuccess: (response: Response) => {
          console.log(response);
        },
      }
      // {
      //   // Always refetch after error or success:
      //   onSettled: () => {
      //     queryClient.invalidateQueries({
      //       queryKey: ["exams", "details", question?.examId],
      //     });
      //   },
      // }
    );
    return mutation;
  } catch (error: any) {
    console.log(error);
  }
};

export default useAddQuestion;
