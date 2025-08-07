import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NoticePage from "../pages/NoticePage";
import PostPage from "../pages/PostPage";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
                path: "notice",
                element: <NoticePage/>
            },
            {
                path: "post",
                element: <PostPage/>
            }
        ]
    }
])