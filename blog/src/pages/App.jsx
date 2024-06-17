import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {Outlet} from "react-router-dom";
import {Divider} from "tdesign-react";

function App() {
    return (
        <div style={{width: "100vw"}}>
            <Header/>
            <Outlet/>
            <Divider/>
            <Footer/>
        </div>
    );
}

export default App;
