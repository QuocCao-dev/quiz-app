import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { exam } from "@/models/examType";
import APIClient from "@/services/api-client-exam";
import { getStoredUser } from "@/user_localStorage";

const apiClient = new APIClient<registerUser>("/exams");

// Create a provider component

const useAddExam = () => {
  const token = getStoredUser();
  const navigate = useNavigate();
  return useMutation<exam, Error>({
    mutationFn: (token: string, newExam: exam) =>
      apiClient.post(token, newExam),
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useAddExam;
