import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";

import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register.tsx";
import Venue from "./pages/venues/Venue.tsx";
import Profile from "./pages/profile/Profile.tsx";
import UpdateProfile from "./pages/profile/ProfileUpdate.tsx";
import CreateVenuePage from "./pages/venues/CreateVenue.tsx";
import UpdateVenuePage from "./pages/venues/UpdateVenues.tsx";
import ProfileBookings from "./pages/profile/Bookings.tsx";
import ProfileVenues from "./pages/profile/ProfileVenues.tsx";

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
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/profiles/:name",
        element: <Profile />,
      },
      {
        path: "/venues/create",
        element: <CreateVenuePage />,
      },
      {
        path: "/venues/:id",
        element: <Venue />,
      },
      {
        path: "/venues/update",
        element: <UpdateVenuePage />,
      },
      {
        path: "/profiles/:name/media",
        element: <UpdateProfile />,
      },
      {
        path: "/profiles/:name/bookings",
        element: <ProfileBookings />,
      },
      {
        path: "/profiles/:name/venues",
        element: <ProfileVenues />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
    </AuthProvider>
  </React.StrictMode>
);
