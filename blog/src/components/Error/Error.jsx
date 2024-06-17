import {Divider} from "tdesign-react";

function Error(props) {
    return (
        <div style={{color: "#0052d9", fontSize: "20px", textAlign: "center", marginTop: "30px"}}>
            <h3>500 ServerError</h3>
            <Divider content={"tecgui blog"}/>
        </div>
    );
}

export default Error;
