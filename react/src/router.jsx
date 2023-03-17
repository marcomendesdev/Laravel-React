import { Navigate, createBrowserRouter } from "react-router-dom";
import Registered from "./layouts/Registered";
import Unregistered from "./layouts/Unregistered";
import PageNotFound from "./components/PageNotFound";
import Users from "./components/Users";
import UpdateForm from "./components/UpdateForm";
import AddNewForm from "./components/AddNewForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Registered />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/:id",
                element: <UpdateForm key="edit" />,
            },
            {
                path: "/users/new",
                element: <AddNewForm key="add" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <Unregistered />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

export default router;
