import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exam } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<exam>("/exams");

// Create a provider component

const usePutExam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Move useNavigate here

  return useMutation<exam, Error>({
    mutationFn: (newExam: exam) => apiClient.put(newExam),

    onError: (err: any, newExam: exam, context: any) => {
      queryClient.setQueryData(["exams"], context.previousExams);
    },
    onSuccess: () => {
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export default usePutExam;
