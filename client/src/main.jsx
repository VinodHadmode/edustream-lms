import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Courses from "./pages/Courses.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/instructor/Dashboard.jsx";
import InstructorCourses from "./pages/instructor/InstructorCourses.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "instructor/dashboard",
        element: <Dashboard />,
      },
      {
        path: "instructor/courses",
        element: <InstructorCourses />,
      },
      { path: "*", element: <>Page not found</> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
