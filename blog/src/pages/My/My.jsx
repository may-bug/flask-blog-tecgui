import style from './My.module.less'
import {useEffect, useState} from "react";
import {updateInfo, updatePwd, userInformation} from "@/api/user.jsx";
import {
    Button,
    DatePicker,
    Descriptions,
    Dialog,
    Form,
    Image,
    Input,
    MessagePlugin,
    Select,
    Space,
    Upload
} from "tdesign-react";
import {useNavigate} from "react-router-dom";
import ME from "../../assets/images/me.svg"
import LoadingComponent from "@/components/LoadingComponent.jsx";

const {DescriptionsItem} = Descriptions
const {FormItem} = Form

function My() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        sex: "",
        brith: "",
        signdate: "",
        account: "",
        imageurl: ""
    })
    const [password, setPassword] = useState({
        old: "",
        new: ""
    })
    useEffect(() => {
        userInformation().then(res => {
            setUser(res.data)
        })
    }, [])
    const upload = (res, file) => {
        setUser({
            name: user.name,
            email: user.email,
            sex: user.sex,
            brith: user.brith,
            signdate: user.signdate,
            account: user.account,
            imageurl: res.response.data.url
        })
    }
    return (
        <div className={style.my}>
            <div className={style.container}>
                <div className={style.info}>
                    <div className={'options'}>
                        <Descriptions
                            className={style.descriptions}
                            itemLayout="horizontal"
                            layout="horizontal"
                            size="medium"
                            title="个人信息"
                        >
                            <DescriptionsItem label="账号">
                                {user.account}
                            </DescriptionsItem>
                            <DescriptionsItem label="姓名">
                                {user.name === null || user.name === "" ? "未设置" : user.name}
                            </DescriptionsItem>
                            <DescriptionsItem label="邮箱">
                                {user.email === null || user.email === "" ? "未设置" : user.email}
                            </DescriptionsItem>
                            <DescriptionsItem label="性别">
                                {user.sex === null || user.sex === "" ? "未设置" : user.sex}
                            </DescriptionsItem>
                            <DescriptionsItem label="出生日期">
                                {user.brith === null || user.brith === "" ? "未设置" : user.brith}
                            </DescriptionsItem>
                            <DescriptionsItem label="注册时间">
                                {user.signdate}
                            </DescriptionsItem>
                            <DescriptionsItem label="角色">
                                {user.role === "member" ? "用户" : "管理员"}
                            </DescriptionsItem>
                        </Descriptions>
                    </div>
                </div>
                <div className={'options'}
                     style={{flex: 1, height: "230px", padding: "20px", display: "flex", justifyContent: "center"}}>
                    <div>
                        <Upload
                            className={style.upload}
                            action="/api/user/image"
                            autoUpload
                            method="POST"
                            showUploadProgress
                            theme="image"
                            useMockProgress
                            formatResponse
                            onSuccess={upload}
                        />
                        <Space className={style.change}>
                            <ChangePassword navigate={navigate} password={password} setPassword={setPassword}/>
                            <ChangeInformation navigate={navigate} user={user} setUser={setUser}/>
                        </Space>
                    </div>
                </div>
            </div>
            <Image src={ME} className={style.image} loading={<LoadingComponent size={"large"}/>}/>
        </div>
    );
}

function ChangePassword(props) {
    // eslint-disable-next-line react/prop-types
    const {password, setPassword, navigate} = props
    const [visible, setVisible] = useState(false);
    const handelSubmit = (e) => {
        if (e.validateResult === true) {
            updatePwd(password).then(res => {
                if (res.code === 200) {
                    MessagePlugin.success(res.msg)
                    setTimeout(() => {
                        navigate("/")
                    }, 500)
                } else {
                    MessagePlugin.error(res.msg)
                }
            })
        } else {
            MessagePlugin.warning("请完整填写表单")
        }
    }
    return (
        <div>
            <Button onClick={() => setVisible(true)} className={style.pwd}>修改密码</Button>
            <Dialog
                closeBtn
                closeOnEscKeydown
                closeOnOverlayClick
                header="修改密码"
                visible={visible}
                mode="modal"
                onClose={() => setVisible(false)}
                placement="top"
                preventScrollThrough
                showOverlay
                footer={null}
                theme="default"
                style={{width: '350px'}}
            >
                <Form statusIcon={true} onSubmit={handelSubmit} colon={true} labelWidth={0}
                      style={{width: '280px', margin: "auto"}}>
                    <FormItem name="new">
                        {/* eslint-disable-next-line react/prop-types */}
                        <Input value={password.old} clearable={true} type="password"
                               placeholder="旧密码" onChange={(e, value) => setPassword({
                            // eslint-disable-next-line react/prop-types
                            new: password.new,
                            old: e
                        })}/>
                    </FormItem>
                    <FormItem name="old">
                        {/* eslint-disable-next-line react/prop-types */}
                        <Input value={password.new} type="password" clearable={true}
                               placeholder="请输入新密码" onChange={(e, value) => {
                            setPassword({
                                new: e,
                                // eslint-disable-next-line react/prop-types
                                old: password.old
                            })
                        }}/>
                    </FormItem>
                    <FormItem>
                        <Button theme="primary" type="submit" block>
                            修改
                        </Button>
                    </FormItem>
                </Form>
            </Dialog>
        </div>
    );
}

function ChangeInformation(props) {
    // eslint-disable-next-line react/prop-types
    const {user, setUser} = props
    const [visible, setVisible] = useState(false);
    const clickBtn = () => {
        setVisible(true)
    }
    const handelSubmit = (e) => {
        if (e.validateResult === true) {
            updateInfo(user).then(res => {
                if (res.code === 200) {
                    MessagePlugin.success(res.msg)
                } else {
                    MessagePlugin.error(res.msg)
                }
            })
        } else {
            MessagePlugin.warning("请完整填写表单")
        }
    }
    return (
        <div>
            <Button onClick={clickBtn} className={style.information}>修改信息</Button>
            <Dialog
                closeBtn
                className={style.dia}
                closeOnEscKeydown
                closeOnOverlayClick
                header="修改信息"
                visible={visible}
                mode="modal"
                onClose={() => setVisible(false)}
                placement="top"
                preventScrollThrough
                showOverlay
                footer={null}
                theme="default"
                style={{width: '350px'}}
            >
                <h3 className={style.tips}>允许只填写某一项</h3>
                <Form statusIcon={true} onSubmit={handelSubmit} colon={true} labelWidth={0}
                      style={{width: '280px', margin: "auto"}}>
                    <FormItem name="name">
                        <Input
                            type="text"
                            defaultValue={user.name}
                            value={user.name}
                            clearable={true}
                            placeholder="姓名"
                            onChange={(e, value) => setUser({
                                name: e,
                                email: user.email,
                                sex: user.sex,
                                brith: user.brith,
                                signdate: user.signdate,
                                account: user.account,
                                imageurl: user.imageurl
                            })}/>
                    </FormItem>
                    <FormItem name="sex">
                        <Select
                            defaultValue={user.sex}
                            value={user.sex}
                            placeholder="性别"
                            onChange={(e) => setUser({
                                name: user.name,
                                email: user.email,
                                sex: e,
                                brith: user.brith,
                                signdate: user.signdate,
                                account: user.account,
                                imageurl: user.imageurl
                            })}
                            style={{width: '100%'}}
                            clearable
                            options={[
                                {label: '男', value: '男'},
                                {label: '女', value: '女'},
                            ]}
                        />
                    </FormItem>
                    <FormItem name="email">
                        <Input
                            type="text"
                            defaultValue={user.email}
                            value={user.email}
                            clearable={true}
                            placeholder="邮箱"
                            onChange={(e, value) => setUser({
                                    name: user.name,
                                    email: e,
                                    sex: user.sex,
                                    brith: user.brith,
                                    signdate: user.signdate,
                                    account: user.account,
                                    imageurl: user.imageurl
                                }
                            )}/>
                    </FormItem>
                    <FormItem name="brith">
                        {/* eslint-disable-next-line react/prop-types */}
                        <DatePicker
                            defaultValue={user.brith}
                            value={user.brith}
                            style={{width: '100%'}}
                            format="YYYY-MM-DD"
                            onChange={(e, value) => {
                                setUser({
                                        name: user.name,
                                        email: user.email,
                                        sex: user.sex,
                                        brith: e,
                                        signdate: user.signdate,
                                        account: user.account,
                                        imageurl: user.imageurl
                                    }
                                )
                            }}/>
                    </FormItem>
                    <FormItem>
                        <Button theme="primary" type="submit" block>
                            提交修改
                        </Button>
                    </FormItem>
                </Form>
            </Dialog>
        </div>
    );
}

export default My;
