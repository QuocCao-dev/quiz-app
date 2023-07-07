import { ExamSchema, exam } from "@/models/examType";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import useAddExam from "@/hooks/exam/useAddExam";
import { toast } from "react-toastify";
import QuestionForm from "../question/QuestionForm";
import { useParams } from "react-router-dom";
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
    formState: { errors },
  } = useForm<exam>({
    defaultValues: initialVal,
    mode: "onChange",
    resolver: zodResolver(ExamSchema),
  });
  const { examId } = useParams();
  console.log(examId);
  const postNewUser = useAddExam();
  const onSubmit = (data: exam) => {
    postNewUser.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {postNewUser.isSuccess && toast.success("Create new exam successfully!")}
      <Card>
        <CardContent>
          <Typography variant="h4">Add Exam</Typography>
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
            <QuestionForm />
            {examId && <QuestionForm />}
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
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
}

export default ExamForm;
