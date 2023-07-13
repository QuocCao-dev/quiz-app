import React from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useExams from "@/hooks/exam/useExams";
import ExamCard from "./ExamCard";
function Exam() {
  const navigate = useNavigate();
  const handleCreateExam = () => {
    navigate("/exams/add");
  };
  const { data: exams } = useExams();
  console.log(exams);
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "flex-end", gap: "10px" }}
      >
        <Button variant="contained" onClick={handleCreateExam}>
          Add new Exam
        </Button>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        marginTop="40px"
      >
        {exams?.data?.data?.map((exam: any, index: number) => (
          <ExamCard key={index} data={exam} />
        ))}
      </Stack>
    </>
  );
}

export default Exam;
