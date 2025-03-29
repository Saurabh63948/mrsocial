import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./components/pages/home/Home";
import Profile from "./components/pages/profile/Profile";
import "./styles.scss";

import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  // Apply dark mode class to body on change
  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${darkMode ? "dark" : "light"}`);
  }, [darkMode]);
  console.log(document.body.classList);

  // Layout Component with Dark Mode Class
  const Layout = () => {
    console.log(`Current Theme: theme-${darkMode ? "dark" : "light"}`);

    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // Protected Route for Auth
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Defining Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  // QueryClientProvider for TanStack Query
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </QueryClientProvider>
  );
}

export default App;