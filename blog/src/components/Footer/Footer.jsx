import style from "./Footer.module.less"
import {Link} from "tdesign-react";

function Footer() {
    return (
        <div className={style.footer}>
            <span>CopyRight  By &copy;<Link hover={'color'} href="https://tecgui.cn">Tecgui</Link></span><br/>
            <span>Author <Link hover={'color'} href="https://github.com/may-bug">may-bug</Link></span>
        </div>
    );
}

export default Footer;
