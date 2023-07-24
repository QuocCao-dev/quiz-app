import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import useTodoQueryStore from "../../store";
import { constructQueryString } from "../../utils/query";
import { exam } from "@/models/examType";
import APIClient, { FetchResponse } from "@/services/api-client-exam";

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<exam[]>("/exams");

const useExams = () => {
  return useQuery<FetchResponse<exam[]> | any>({
    queryKey: ["exams", "list"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("0s"),
    enabled: true,
  });
};

export default useExams;
