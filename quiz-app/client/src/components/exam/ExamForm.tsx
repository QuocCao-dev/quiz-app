import { examSchema, Exam } from "@/models/examType";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import useAddExam from "@/hooks/exam/useAddExam";
import { toast } from "react-toastify";
import QuestionForm from "../question/QuestionForm";
import { useNavigate, useParams, useHref } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useExam from "@/hooks/exam/useExam";
import usePutExam from "@/hooks/exam/usePutExam";

const initialVal = {
  name: "",
  duration: 0,
  category: "",
  totalMarks: 0,
  passingMarks: 0,
};
function ExamForm() {
  const {
    handleSubmit,
    control,
    reset,
    resetField,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<Exam>({
    defaultValues: initialVal,
    mode: "onChange",
    resolver: zodResolver(examSchema),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id: examId } = useParams();
  const [questions, setQuestions] = useState([{}, {}, {}, {}]); // initialize with 4 questions
  const navigate = useNavigate();
  const handleAddQuestion = () => {
    setQuestions([...questions, {}]); // Add a new question
  };
  const handleDeleteQuestion = (indexToDelete: number) => {
    setQuestions(questions.filter((_, index) => index !== indexToDelete)); // Remove a specific question
  };
  const postNewExam = useAddExam();
  const updateExam = usePutExam();
  const onSubmit = (data: Exam) => {
    if (examId) {
      updateExam?.mutate(data, {
        onSuccess: (data) => {
          toast("Updated successfully!");
          navigate("/exams");
        },
      });
    } else {
      postNewExam?.mutate(
        data,
        {
          onSuccess: (data) => {
            toast("Added successfully!");
            navigate("/exams");
          },
        }
      );
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [existingExam, setExistingExam] = useState(null);
  const { data: exam } = useExam(Number(examId));
  useEffect(() => {
    if (exam) {
      setExistingExam(exam);
      reset(exam); // Setting form data to existing exam data
      setIsEditing(true);
      setQuestions([...exam.questions])
    } else {
      setExistingExam(null);
      reset(initialVal); // Setting form data to initial value
      setIsEditing(false);
    }
  }, [exam]);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(initialVal);
    }
  }, [formState, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Typography variant="h4">
            {examId ? "Edit Exam" : "Add Exam"}
          </Typography>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Name</Typography>
              <Input control={control} name="name" rules={{ required: true }} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Passing mark</Typography>
              <Input
                control={control}
                name="passingMarks"
                rules={{ required: true }}
                type="number"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Total mark</Typography>
              <Input
                name="totalMarks"
                control={control}
                rules={{ required: true }}
                type="number"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Duration</Typography>
              <Input
                name="duration"
                control={control}
                rules={{ required: true }}
                type="number"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Category</Typography>
              <Input
                name="category"
                control={control}
                rules={{ required: true }}
                type="string"
              />
            </Grid>
            {examId &&
              questions.map((question: any, index: number) => (
                <React.Fragment key={index}>
                  <QuestionForm indexQuestion={index} question={question} />
                  {index >= 4 && ( // Only show the DeleteIcon for questions after the first four
                    <Grid item xs={1} style={{ textAlign: "right" }}>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            <Grid
              item
              xs={12}
              sx={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton color="primary" onClick={handleAddQuestion}>
                Add new question{" "}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        {examId && (
          <>
            <Button sx={{ m: 1 }} type="submit" variant="contained">
              Edit
            </Button>
            <Button sx={{ m: 1 }} type="submit" variant="contained">
              Delete
            </Button>
          </>
        )}
        {!examId && (
          <Button sx={{ m: 1 }} type="submit" variant="contained">
            Save
          </Button>
        )}
      </Box>
    </form>
  );
}

export default ExamForm;
