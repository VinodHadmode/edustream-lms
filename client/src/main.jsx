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
import CreateCourse from "./pages/instructor/CreateCourse.jsx";
import InstructorLayout from "./layouts/InstructorLayout.jsx";
import EditCourse from "./pages/instructor/EditCourse.jsx";
import CourseDetail from "./pages/student/CourseDetail.jsx";

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

      //instructor routes
      {
        path: "instructor",
        element: <InstructorLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "courses", element: <InstructorCourses /> },
          { path: "courses/create", element: <CreateCourse /> },
          { path: "courses/update/:courseId", element: <EditCourse /> },
        ],
      },
      { path: "course-detail/:courseId", element: <CourseDetail /> },

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
