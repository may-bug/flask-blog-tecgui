import {Button, Form, Input, Link, Loading, MessagePlugin} from 'tdesign-react';
import {DesktopIcon, LockOnIcon} from 'tdesign-icons-react';
import style from './Login.module.less'
import {useNavigate} from "react-router-dom";
import {check, login} from "../../api/user.jsx"
import {useEffect, useState} from "react";

const {FormItem} = Form;

export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        account: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const onSubmit = (e) => {
        if (e.validateResult === true) {
            setLoading(true)
            login(user).then(res => {
                if (res.code === 200) {
                    MessagePlugin.success(res.msg)
                    setLoading(false)
                    setTimeout(() => {
                        navigate("/person")
                    }, 1000)
                } else {
                    MessagePlugin.warning(res.msg)
                }
            }).then(() => {
                setLoading(false)
            })
        } else {
            MessagePlugin.warning("请完整填写表单")
        }
    };
    useEffect(() => {
        check().then(res => {
            if (res.code === 200) {
                navigate("/person")
            }
        })
    }, [navigate])
    const onReset = (e) => {
        MessagePlugin.info('重置成功');
    };

    return (
        <div className={style.login}>
            <div>
                <h3>TECGUI BLOG</h3>
                <h4>登录</h4>
                <Form statusIcon={true} onSubmit={onSubmit} onReset={onReset} colon={true} labelWidth={0}
                      style={{width: '350px'}}>
                    <FormItem name="account">
                        <Input value={user.account} clearable={true} prefixIcon={<DesktopIcon/>}
                               placeholder="请输入账号" onChange={(e, value) => setUser({
                            account: e,
                            password: user.password
                        })}/>
                    </FormItem>
                    <FormItem name="password">
                        <Input value={user.password} type="password" prefixIcon={<LockOnIcon/>} clearable={true}
                               placeholder="请输入密码" onChange={(e, value) => {
                            setUser({
                                account: user.account,
                                password: e
                            })
                        }}/>
                    </FormItem>
                    <FormItem>
                        <Button theme="primary" type="submit" block>
                            登录
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Link hover={'color'} onClick={() => navigate('/sign')}>立即注册</Link>
                        <div style={{flexGrow: 1}}></div>
                        <Link hover={'color'}>找回密码</Link>
                    </FormItem>
                </Form>
            </div>
            <Loading loading={loading} fullscreen preventScrollThrough={true} text="登录中"></Loading>
        </div>
    );
}
