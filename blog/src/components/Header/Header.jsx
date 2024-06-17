import style from "./Header.module.less"
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {Button, Menu} from 'tdesign-react';
import {SearchIcon, UserIcon} from 'tdesign-icons-react';
import Logo from "../../assets/images/logo.png"

const {HeadMenu, MenuItem} = Menu;

function Header() {
    const [active, setActive] = useState('0');
    const navigate = useNavigate()
    const changeMenu = (data) => {
        setActive(data)
        navigate(data)
    }
    return (
        <div className={style.header}>
            <HeadMenu
                value={active}
                onChange={(v) => changeMenu(v)}
                logo={<img src={Logo} height="20" alt="logo"/>}
                operations={
                    <div className="tdesign-demo-menu__operations">
                        <Button variant="text" shape="square" icon={<SearchIcon/>}/>
                        <Button variant="text" shape="square" icon={<UserIcon/>} onClick={() => navigate('/login')}/>
                    </div>
                }
            >
                <MenuItem value={'/'}>
                    <span>首页</span>
                </MenuItem>
                <MenuItem value={'/list'}>
                    <span>文章列表</span>
                </MenuItem>
                <MenuItem value={'/about'}>
                    <span>关于</span>
                </MenuItem>
            </HeadMenu>
        </div>
    );
}

export default Header;
