import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
// import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import useGetme from "@/hooks/auth/useGetme";
import { useEffect } from "react";

const Layout = () => {
  // const isFetching = useIsFetching();
  // const isMutating = useIsMutating();
  // token ? JSON.parse(token) : null;S
  const { data: userInfo } = useGetme();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* {isFetching + isMutating !== 0 && <Spinner />} */}
      <ToastContainer />
      <NavBar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
