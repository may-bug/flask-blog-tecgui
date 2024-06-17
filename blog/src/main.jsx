import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import 'tdesign-react/es/style/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    //<React.StrictMode>
    <RouterProvider router={router}/>
    // </React.StrictMode>
)
