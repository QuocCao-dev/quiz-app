import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import useDeleteExam from "@/hooks/exam/useDeleteExam";
import useExam from "@/hooks/exam/useExam";
import { Link, useNavigate } from "react-router-dom";
function ExamCard(data: any) {
  const deleteExam = useDeleteExam();
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteExam.mutate(data?.data.id);
  };
  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardActionArea>
        <DialogActions onClick={handleDelete}>
          <CloseIcon />
        </DialogActions>
        <CardMedia
          component="img"
          height="140"
          image="../../public/react-query.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Marks: {data?.data?.totalMarks}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Passing Marks: {data?.data?.passingMarks}
          </Typography>
        </CardContent>
      </CardActionArea>
      <DialogActions>
        <Link to={`/exams/${data?.data.id}/edit`}>
          <Button>Add Questions</Button>
        </Link>
        <Link to={`/exams/${data?.data.id}/testing`}>
          <Button>Take an exam</Button>
        </Link>
      </DialogActions>
    </Card>
  );
}

export default ExamCard;
