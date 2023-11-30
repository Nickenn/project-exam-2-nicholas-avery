import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Venue from "./pages/Venue.tsx";
import VenueCalendar from "./pages/Calendar.tsx";
import Profile from "./pages/profile/Profile.tsx";
import UpdateProfile from "./pages/profile/ProfileUpdate.tsx";

import AppLayout from "./AppLayout.tsx";
import GlobalStyles from "./GlobalStyles.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/calendar.tsx",
        element: <VenueCalendar />,
      },
      {
        path: "/auth/login.tsx",
        element: <Login />,
      },
      {
        path: "/auth/register.tsx",
        element: <Register />,
      },
      {
        path: "/profiles/:name",
        element: <Profile />,
      },
      {
        path: "/venues/:id",
        element: <Venue />,
      },
      {
        path: "/profiles/:name/media",
        element: <UpdateProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyles />
  </React.StrictMode>
);
