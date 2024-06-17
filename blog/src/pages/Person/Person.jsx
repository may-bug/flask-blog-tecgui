import {Avatar, Button, DialogPlugin, Dropdown, Layout, Menu, MessagePlugin} from 'tdesign-react';
import {
    DashboardIcon,
    EditIcon,
    HomeIcon,
    Icon,
    ListIcon,
    LogoutIcon,
    PersonalInformationIcon,
    RootListIcon,
    SearchIcon,
    User1Icon,
    UserCircleIcon,
    UserListIcon,
    ViewListIcon,
} from 'tdesign-icons-react';
import {Outlet, useNavigate} from "react-router-dom";
import style from './Person.module.less'
import Logo from "../../assets/images/logo.png"
import {useEffect, useState} from "react";
import {logout, userInformation} from "@/api/user.jsx";

const {HeadMenu, MenuItem} = Menu;
const {Header, Content, Aside} = Layout;

export default function Person() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        url: null,
        name: ""
    })
    useEffect(() => {
        userInformation().then(res => {
            setUser({
                url: res.data.url,
                name: res.data.name,
                role: res.data.role
            })
        })
    }, []);
    const handleLogout = () => {
        const dialog = DialogPlugin({
            header: '提示',
            body: '您确定要注销登录吗?',
            onConfirm: ({e}) => {
                logout().then(res => {
                    MessagePlugin.success(res.msg)
                })
                setTimeout(() => {
                    navigate('/')
                }, 1000)
                dialog.hide();
            },
            onClose: ({e, trigger}) => {
                dialog.hide();
            },
            onCloseBtnClick: ({e}) => {
                console.log('close btn: ', e);
            }
        });
    }
    const handleClick = (data) => {
        if (data.value === 3) {
            handleLogout()
        }
        if (data.value === 1) {
            navigate("/person/me")
        }
    }
    const options = [
        {
            content: '我的信息',
            value: 1,
            prefixIcon: <PersonalInformationIcon/>
        },
        {
            content: '注销登录',
            value: 3,
            prefixIcon: <LogoutIcon/>,
        },
    ];
    return (
        <div className={style.person}>
            <Layout>
                <Header className={style.header}>
                    <HeadMenu
                        value="item1"
                        logo={<img width="136" src={Logo} alt="logo"/>}
                        operations={
                            <div>
                                <SearchIcon className="t-menu__operations-icon"/>
                                <HomeIcon className="t-menu__operations-icon" onClick={() => navigate('/')}/>
                                <Avatar
                                    size={20}
                                    image={user.url === null || user.url === "" ? "/api/static/images/user.svg" : user.url}
                                    shape="circle"
                                />
                                <span style={{padding: "0 10px"}}>{user.name}</span>
                                <Dropdown options={options} onClick={handleClick}>
                                    <Button variant="text" suffix={<Icon name="chevron-down" size="16"/>}>
                                        更多
                                    </Button>
                                </Dropdown>
                            </div>
                        }
                    >
                    </HeadMenu>
                </Header>
                <Layout>
                    <Aside style={{borderTop: '1px solid var(--component-border)', height: "92vh"}}>
                        <BasicUsage user={user}/>
                    </Aside>
                    <Layout>
                        <Content className={style.content}>
                            <div className={"options"} style={{padding: '5px'}}>
                                <Outlet/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

function BasicUsage(props) {
    // eslint-disable-next-line react/prop-types
    const {user} = props
    const navigate = useNavigate()
    const changeMenu = (data) => {
        navigate(data)
        setActivate(data)
    }
    const [activate, setActivate] = useState('/person')
    return (
        <Menu value={activate} className={style.aside} onChange={changeMenu}>
            <MenuItem value="/person" icon={<DashboardIcon/>}>
                详情面板
            </MenuItem>
            <MenuItem value="/person/editor" icon={<EditIcon/>}>
                新建文章
            </MenuItem>
            <MenuItem value="/person/mypage" icon={<RootListIcon/>}>
                我的文章
            </MenuItem>
            <MenuItem value="/person/comment" icon={<ViewListIcon/>}>
                我的评论
            </MenuItem>
            {
                // eslint-disable-next-line react/prop-types
                user.role === "admin" ? (
                    <>
                        <MenuItem value="/person/pagemanager" icon={<ListIcon/>}>文章管理</MenuItem>
                        <MenuItem value="/person/commentmanager" icon={<UserListIcon/>}>评论管理</MenuItem>
                        <MenuItem value="/person/usermanager" icon={<User1Icon/>}>用户管理</MenuItem>
                    </>
                ) : null
            }
            <MenuItem value="/person/me" icon={<UserCircleIcon/>}>
                个人中心
            </MenuItem>
        </Menu>
    );
}
