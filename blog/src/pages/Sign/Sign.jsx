import {Button, Form, Input, Link, Loading, MessagePlugin} from 'tdesign-react';
import {DesktopIcon, LockOnIcon, MailIcon} from 'tdesign-icons-react';
import style from './Sign.module.less'
import {useNavigate} from "react-router-dom";
import {sign} from "@/api/user.jsx";
import {useState} from "react";

const {FormItem} = Form;

export default function Sign() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        account: "",
        password: "",
        email: ""
    })
    const [loading, setLoading] = useState(false)
    const onSubmit = (e) => {
        if (e.validateResult === true) {
            sign(user).then(res => {
                if (res.code === 200) {
                    MessagePlugin.success(res.msg)
                    setLoading(false)
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                } else {
                    MessagePlugin.warning(res.msg)
                }
            }).then(() => {
                setLoading(false)
            })
        }
    };

    const onReset = (e) => {
        MessagePlugin.info('重置成功');
    };

    return (
        <div className={style.sign}>
            <div>
                <h3>TECGUi BOLG</h3>
                <h4>注册</h4>
                <Form statusIcon={true} onSubmit={onSubmit} onReset={onReset} colon={true} labelWidth={0}
                      style={{width: '350px'}}>
                    <FormItem name="account">
                        <Input value={user.account} clearable={true} prefixIcon={<DesktopIcon/>}
                               placeholder="请输入账号" onChange={(e, t) => {
                            setUser({
                                account: e,
                                email: user.email,
                                password: user.password
                            })
                        }}/>
                    </FormItem>
                    <FormItem name="password">
                        <Input value={user.password} type="password" prefixIcon={<LockOnIcon/>} clearable={true}
                               placeholder="请输入密码" onChange={(e, t) => {
                            setUser({
                                account: user.account,
                                email: user.email,
                                password: e
                            })
                        }}/>
                    </FormItem>
                    <FormItem name="password">
                        <Input value={user.email} type="text" prefixIcon={<MailIcon/>} clearable={true}
                               placeholder="请输入邮箱" onChange={(e, t) => {
                            setUser({
                                account: user.account,
                                email: e,
                                password: user.password
                            })
                        }}/>
                    </FormItem>
                    <FormItem>
                        <Button theme="primary" type="submit" block>
                            注册
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Link hover={'color'} onClick={() => navigate('/login')}>返回登录</Link>
                        <div style={{flexGrow: 1}}></div>
                        <Link hover={'color'}>找回密码</Link>
                    </FormItem>
                </Form>
            </div>
            <Loading loading={loading} fullscreen preventScrollThrough={true} text="注册中"></Loading>
        </div>
    );
}
