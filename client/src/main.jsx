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
import AuthRoute from "./components/AuthRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import InstructorRoute from "./components/InstructorRoute.jsx";
import CourseProgress from "./pages/student/CourseProgress.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //public routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />,
      },

      //Auth routes
      {
        element: <AuthRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },

      //Protected routes - redirect to login if not loggedIn
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "course-progress/:courseId", element: <CourseProgress /> },
        ],
      },

      //Instructor routes - redirects to / if not intructor
      {
        element: <InstructorRoute />,
        children: [
          { path: "instructor/dashboard", element: <Dashboard /> },
          { path: "instructor/courses", element: <InstructorCourses /> },
          { path: "instructor/courses/create", element: <CreateCourse /> },
          {
            path: "instructor/courses/:courseId",
            element: <EditCourse />,
          },
        ],
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
