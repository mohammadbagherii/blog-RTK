import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import CreateBlogForm from "../components/CreateBlogForm";
import EditBlogForm from "../components/EditBlogForm";
import SingleBlogPage from "../components/SingleblogPage";
import UserPage from "../components/UserPage";
import UsersList from "../components/UsersList";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (
            <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
        ),
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path:'/blogs/create-blog',
                element:<CreateBlogForm/>
            },
            {
                path:'/blogs/:blogId',
                element:<SingleBlogPage/>
            },
            {
                path:'/editBlog/:blogId',
                element:<EditBlogForm/>
            },
            {
                path:'/users',
                element:<UsersList/>
            },
            {
                path:'/users/:userId',
                element:<UserPage/>
            }
        ],
    },
]);
