import {Divider} from "tdesign-react";

function NotFound() {
    return (
        <div>
            <div style={{color: "#0052d9", fontSize: "20px", textAlign: "center", marginTop: "30px"}}>
                <h3>404 NotFound</h3>
                <h4>未找到页面</h4>
                <Divider content={"tecgui blog"}/>
            </div>
        </div>
    );
}

export default NotFound;
