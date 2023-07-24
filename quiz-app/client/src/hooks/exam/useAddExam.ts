import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exam } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";
import { toast } from "react-toastify";

const apiClient = new APIClient<exam>("/exams");

// Create a provider component

const useAddExam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Move useNavigate here

  try {
    //useQuery
    const mutation = useMutation<any>(
      (newExam: exam) => apiClient.post(newExam),
      {
        onError: (err: any, newExam: exam, context: any) => {
          queryClient.setQueryData(["exams"], context.previousExams);
        },
        onSuccess: () => {
          toast.success("Exam is added");
          navigate("/exams");
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["exams"] });
        },
      }
    );
    return mutation;
  } catch (error: any) {}
};

export default useAddExam;
