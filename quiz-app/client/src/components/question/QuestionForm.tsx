import { ExamSchema, exam } from "@/models/examType";
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
import DeleteIcon from "@mui/icons-material/Delete";

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
    resolver: zodResolver(ExamSchema),
  });

  const postNewUser = useAddExam();
  const onSubmit = (data: exam) => {
    // postNewUser.mutate(data);
  };
  return (
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
        <IconButton
          aria-label="delete"
          // disabled={sessions.length === 1}
          color="primary"
          // onClick={handleDeleteSession}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item md={10} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input name="name" control={control} rules={{ required: true }} />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="options"
              control={control}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="correctOption"
              control={control}
              rules={{ required: true }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Button
        // onClick={handleAddSession}
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
  );
}

export default QuestionForm;
