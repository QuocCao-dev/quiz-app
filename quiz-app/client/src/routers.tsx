import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ExamPage from "./pages/ExamPage";
import ExamForm from "./components/exam/ExamForm";
import ExamTest from "./components/examTest/ExamTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/exams", element: <ExamPage /> },
      { path: "/exams/add", element: <ExamForm /> },
      { path: "/exams/:id", element: <ExamForm /> },
      { path: "/exams/:id/edit", element: <ExamForm /> },
      { path: "/exams/:id/testing", element: <ExamTest /> },
    ],
  },
]);

export default router;
