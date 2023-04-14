import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import HomePage from "../pages/HomePage";
import SinglePage from "../pages/SinglePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
                index: true
            },
            {
                path: '/products/:id',
                element: <SinglePage/>
            },
            {
                path: "/tags/:name",
                element: <HomePage />
            }
        ]
    }
])

export default router;