import { QuestionSchema, exam } from "@/models/examType";
import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import useAddExam from "@/hooks/exam/useAddExam";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
const initialVal = {
  name: "",
  duration: 0,
  category: "",
  totalMarks: 0,
  passingMarks: 0,
};
function QuestionForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<exam>({
    defaultValues: initialVal,
    mode: "onChange",
    resolver: zodResolver(QuestionSchema),
  });

  const postNewUser = useAddExam();
  const onSubmit = (data: exam) => {
    console.log(data);
    // postNewUser.mutate(data);
  };
  const [options, setOptions] = useState([{}, {}]);

  const handleAddOption = () => {
    setOptions([...options, {}]); // Add a new option
  };
  const handleDeleteOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Typography variant="h6">Question </Typography>
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
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <Grid item xs={4}>
                  <Input
                    name={`option_${index}`}
                    control={control}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteOption(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={2} sx={{ marginTop: "5px" }}>
              <AddIcon
                type="button"
                onClick={handleAddOption}
                fontSize="large"
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            display: "block",
            width: "100%",
            border: "dotted",
          }}
          // disabled={!sessions[sessions.length - 1].start}
        >
          Save a new Question
        </Button>
      </Grid>
    </form>
  );
}

export default QuestionForm;
