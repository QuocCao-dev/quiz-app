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
function NavBar() {
  const [token, setToken] = useState<string | null>(getStoredUser());
  const getMe = useGetme();
  const [infoUser, setInfoUser] = useState<existingUser | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleSignout = () => {
    clearStoredUser();
    setInfoUser(null);
    setToken(null);
  };
  const handleExam = () => {
    setOpen(false);
    navigate("/exams");
  };
  useEffect(() => {
    setToken(getStoredUser());
    if (token) {
      getMe.mutate(token, {
        onSuccess: (data) => {
          setInfoUser(data);
        },
      });
    }
  }, [token]);
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
        {token ? (
          <Button component={Link} to="/" onClick={handleSignout}>
            LOGOUT
          </Button>
        ) : (
          <Button component={Link} to="/login">
            LOGIN
          </Button>
        )}
        {infoUser ? (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Button onClick={handleClick}>
              Hello {infoUser?.data?.name}
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
