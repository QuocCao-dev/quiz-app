import { questionSchema, Question } from "@/models/examType";
import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import useAddExam from "@/hooks/exam/useAddExam";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useAddQuestion from "@/hooks/question/useAddQuestion";
import { useParams } from "react-router-dom";
import { useFieldArray } from "react-hook-form";
import useDeleteQuestion from "@/hooks/question/useDeleteQuestion";
import usePutQuestion from "@/hooks/question/usePutQuestion";

const initialVal = {
  name: "",
  correctOption: "",
  options: [{}, {}],
  examId: null,
};
type QuestionFormProps = {
  indexQuestion: number;
  question: any;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  indexQuestion,
  question,
}) => {
  const {
    watch,
    handleSubmit,
    register,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialVal,
    mode: "onChange",
    // resolver: zodResolver(questionSchema),
  });
  const { id: idOfExam } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const postNewQuestion = useAddQuestion();
  const deleteQuestion = useDeleteQuestion();
  const putNewQuestion = usePutQuestion();

  const [options, setOptions] = useState([{}, {}]);
  const [questionId, setQuestionId] = useState(null);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "options",
  });
  const watchFieldArray = watch("options");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const handleDelete = () => {
    if (questionId) {
      deleteQuestion?.mutate(questionId, {
        onSuccess: (data) => {
          setIsSubmitted(false);

          reset({ ...initialVal });
          replace({ name: "" });
        },
      });
    }
  };
  const handleEdit = () => {
    const data = getValues();
    const newOptions = data.options.map((option: any) => option?.name);

    putNewQuestion?.mutate(
      {
        ...data,
        options: [...newOptions],
        examId: Number(idOfExam),
        id: questionId,
      },
      {
        onSuccess: (data) => {
          console.log("edited", data);
        },
      }
    );
  };
  const onSubmit = (data: any) => {
    const newOptions = data.options.map((option: any) => option?.name);
    postNewQuestion?.mutate(
      {
        ...data,
        options: [...newOptions],
        examId: idOfExam,
      },
      {
        onSuccess: (data) => {
          setIsSubmitted(true);
          setQuestionId(data.data.id);
        },
      }
    );
  };
  // useEffect(() => {
  //   if (question) {
  //     reset(question); // Setting form data to existing exam data
  //   } else {
  //     reset(initialVal); // Setting form data to initial value
  //   }
  // }, [question]);
  console.log(question);
  return (
    <form>
      <Grid
        container
        spacing={2}
        // {...props}
        sx={{
          ml: 2,
          mb: 3,
          pr: 2,
          pt: 2,
          backgroundColor: "background.default",
          borderRadius: 2,
        }}
      >
        <Grid item md={2} xs={12}>
          <Typography variant="h6">Question {indexQuestion + 1}</Typography>
        </Grid>
        <Grid item md={10} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input name="name" control={control} rules={{ required: true }} />
            </Grid>
            <Grid item xs={7}>
              <Input
                name="correctOption"
                control={control}
                rules={{ required: true }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {controlledFields.map((field, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    <TextField
                      {...register(`options.${index}.name` as const)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton color="secondary" onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              );
            })}

            <Grid item xs={2} sx={{ marginTop: "5px" }}>
              <AddIcon
                type="button"
                onClick={() => {
                  append({ name: "" });
                }}
                fontSize="large"
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isSubmitted && (
            <>
              <IconButton type="button" color="primary" onClick={handleEdit}>
                Edit
              </IconButton>
              <IconButton type="button" color="primary" onClick={handleDelete}>
                Delete
              </IconButton>
            </>
          )}
          {!isSubmitted && (
            <IconButton
              type="button"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </IconButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default QuestionForm;
