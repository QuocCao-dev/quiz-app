import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exam } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<exam>("/exams");

// Create a provider component

const useDeleteExam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Move useNavigate here

  return useMutation<exam, Error>({
    mutationFn: (id: number) => apiClient.delete(id),

    onError: (err: any, newExam: exam, context: any) => {
      toast.success("Exam is not deleted");
      //   queryClient.setQueryData(["exams"], context.previousExams);
    },
    onSuccess: () => {
      toast.success("Exam is deleted");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export default useDeleteExam;
