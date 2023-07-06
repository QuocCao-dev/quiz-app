import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { clearStoredUser, getStoredUser } from "../user_localStorage";
import useGetme from "@/hooks/useGetme";
import { existingUser } from "@/models/userType";
import { useEffect, useState } from "react";

function NavBar() {
  const [token, setToken] = useState<string | null>(getStoredUser());
  const getMe = useGetme();
  const [infoUser, setInfoUser] = useState<existingUser | null>(null);

  useEffect(() => {
    setToken(getStoredUser());
    if (token) {
      getMe.mutate(token, {
        onSuccess: (data) => {
          setInfoUser(data);
        },
      });
    }
  }, [token]); // Only re-run the effect if token changes

  const handleSignout = () => {
    clearStoredUser();
    setInfoUser(null);
    setToken(null);
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
          <Button component={Link} to="/profile">
            Hello {infoUser?.data?.name}
          </Button>
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
