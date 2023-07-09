import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
function ExamCard(data: any) {
  const handleDelete = () => {
    console.log(data?.data.id);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button>Add Questions</Button>
      </DialogActions>
    </Card>
  );
}

export default ExamCard;
