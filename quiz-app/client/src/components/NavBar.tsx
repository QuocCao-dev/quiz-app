import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { clearStoredUser, getStoredUser } from "../user_localStorage";
import useGetme from "@/hooks/auth/useGetme";
import { existingUser } from "@/models/userType";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAuthStore } from "@/zustand/useAuthStore";
function NavBar() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const handleClick = () => {
    setOpen(true);
  };

  const handleSignout = () => {
    clearStoredUser();

  };
  const handleExam = () => {
    setOpen(false);
    navigate("/exams");
  };
  
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
        {user ? (
          <Button component={Link} to="/" onClick={handleSignout}>
            LOGOUT
          </Button>
        ) : (
          <Button component={Link} to="/login">
            LOGIN
          </Button>
        )}
        {user ? (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Button onClick={handleClick}>
              Hello {user?.name}
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleExam}>
                  <ListItemText primary="Your exams" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        ) : (
          <Button component={Link} to="/register">
            Register
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default NavBar;
