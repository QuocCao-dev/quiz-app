import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exam } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";

const apiClient = new APIClient<exam>("/exams");

// Create a provider component

const useAddExam = () => {
  const queryClient = useQueryClient();

  return useMutation<exam, Error>({
    mutationFn: (newExam: exam) => apiClient.post(newExam),
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.setQueryData({
        queryKey: ["exams", { id: variables.id }],
        data,
      });
    },
    onError: () => {},
  });
};

export default useAddExam;
