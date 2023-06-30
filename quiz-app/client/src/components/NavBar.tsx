import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Box
      sx={{
        display: "flex",
        mt: 0,
        pl: 20,
        pr: 20,
        minHeight: "50px",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Typography variant="h6">Quiz App</Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/register">
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default NavBar;
