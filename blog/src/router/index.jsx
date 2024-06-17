import {createBrowserRouter} from "react-router-dom";
import App from "../pages/App.jsx";
import Home from "../pages/Home/Home.jsx";
import List from "../pages/List/PageListView.jsx";
import About from "../pages/About/About.jsx";
import Login from "../pages/Login/Login.jsx";
import Sign from "../pages/Sign/Sign.jsx";
import Person from "../pages/Person/Person.jsx";
import EditorView from "../components/Editor/EditorView.jsx";
import Detail from "@/components/Detail/Detail.jsx";
import MyPageListView from "@/pages/MyPageList/MyPageListView.jsx";
import MyDetail from "@/components/MyDetail/MyDetail.jsx";
import My from "@/pages/My/My.jsx";
import Panel from "@/pages/Panel/Panel.jsx";
import PageManager from "@/pages/PageManager/PageManager.jsx";
import Comment from "@/pages/Comment/Comment.jsx";
import CommentManager from "@/pages/CommentManager/CommentManager.jsx";
import UserManager from "@/pages/UserManager/UserManager.jsx";
import Error from "@/components/Error/Error.jsx";
import NotFound from "@/components/Error/NotFound.jsx";
import {lazy} from "react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
                errorElement: <Error/>,
            },
            {
                path: '/list',
                element: <List/>,
                errorElement: <Error/>,
            },
            {
                path: '/about',
                element: <About/>,
                errorElement: <Error/>,
            },
            {
                path: '/detail',
                element: <Detail/>,
                errorElement: <Error/>,
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Error/>,
    },
    {
        path: "/sign",
        element: <Sign/>,
        errorElement: <Error/>,
    },
    {
        path: '/person',
        element: <Person/>,
        errorElement: <Error/>,
        children: [
            {
                path: 'editor',
                element: <EditorView/>,
                errorElement: <Error/>,
            },
            {
                path: 'mypage',
                element: <MyPageListView/>,
                errorElement: <Error/>,
            },
            {
                path: 'detail',
                element: <MyDetail/>,
                errorElement: <Error/>,
            },
            {
                path: 'me',
                element: <My/>,
                errorElement: <Error/>,
            },
            {
                path: '',
                element: <Panel/>,
                errorElement: <Error/>,
            },
            {
                path: 'pagemanager',
                element: <PageManager/>,
                errorElement: <Error/>,
            },
            {
                path: 'commentmanager',
                element: <CommentManager/>,
                errorElement: <Error/>,
            },
            {
                path: 'usermanager',
                element: <UserManager/>,
                errorElement: <Error/>,
            },
            {
                path: 'comment',
                element: <Comment/>,
                errorElement: <Error/>,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);
