import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protectedRoutes";
import Profile from "./pages/profile";
import AdminSignup from "./pages/adminSignup";
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
import Preferences from "./pages/preferences";
import InviteFriend from "./pages/inviteFriend";
import Friends from "./pages/friends";
import CreateWaves from "./pages/createWaves";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:'/adminSignup',
    element:<AdminSignup/>
  },
   {
    path:'/adminLogin',
    element:<AdminLogin/>
  },
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
  
  
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard Content</div>,
      },
      {
        path: "profile/:userId",
        element: <Profile/>,
      },
      {
        path: "settings",
        element: <div>Settings Content</div>,
      },
      {
        path: "preferences",
        element: <Preferences />,
     },
      {
        path: "inviteFriend",
        element: <InviteFriend />,
     },
       {
        path: "friends",
        element: <Friends />,
     },
     {
    path: "/createWaves",
    element: <CreateWaves />,
  },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
