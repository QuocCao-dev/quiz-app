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
import React from "react";

function Register() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {/* <AddCircleOutlineOutlinedIcon /> */}
          </Avatar>
          <h2 style={headerStyle}>Register</h2>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            sx={{ marginBottom: 2 }}
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
  );
}

export default Register;
