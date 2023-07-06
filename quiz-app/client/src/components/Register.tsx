import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { RegisterUserSchema, registerUser } from "../models/userType";
import { useForm } from "react-hook-form";
import Input from "./Input";

import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
const initialVal = {
  email: "",
  password: "",
  name: "",
};
function Register() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "rgb(25, 118, 210)" };
  const { handleSubmit, control } = useForm<registerUser>({
    defaultValues: initialVal,
    mode: "onChange",
    resolver: zodResolver(RegisterUserSchema),
  });
  const navigate = useNavigate();
  const postNewUser = useRegister();
  const onSubmit = (data: registerUser) => {
    postNewUser.mutate(data);
  };
  postNewUser.isSuccess && navigate("/login");

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              {/* <AddCircleOutlineOutlinedIcon /> */}
            </Avatar>
            <h2 style={headerStyle}>Register</h2>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input control={control} name="name" rules={{ required: true }} />
            <Input control={control} name="email" rules={{ required: true }} />
            <Input
              control={control}
              name="password"
              rules={{ required: true }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
              sx={{ marginBottom: 2 }}
            />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Register;
