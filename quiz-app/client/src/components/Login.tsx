import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";
import { BasicUserSchema, user } from "../models/userType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import backgroundImage from "../../public/Sunflower-Background-Image.jpg";

const initialVal = {
  email: "",
  password: "",
};
const Login = () => {
  const { handleSubmit, control } = useForm<user>({
    defaultValues: initialVal,
    mode: "onChange",
    resolver: zodResolver(BasicUserSchema),
  });
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "rgb(25, 118, 210)" };
  const btnstyle = { margin: "8px 0" };
  const logIn = useLogin();
  const onSubmit = (data: user) => {
    logIn.mutate(data);
  };
  logIn?.isSuccess && navigate("/");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
            <h2>Log In</h2>
          </Grid>

          <Input control={control} name="email" rules={{ required: true }} />
          <Input control={control} name="password" rules={{ required: true }} />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Log in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?<Link href="#">Register</Link>
          </Typography>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
