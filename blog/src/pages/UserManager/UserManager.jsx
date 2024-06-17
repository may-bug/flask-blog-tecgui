import {useEffect, useState} from "react";
import {personList, personRemove} from "@/api/manager.jsx";
import {Button, DialogPlugin, MessagePlugin, Table} from "tdesign-react";
import style from "@/pages/PageManager/PageManager.module.less";

function UserManager() {
    return (
        <div className={style.manager}>
            <h5>用户管理</h5>
            <TableView/>
        </div>
    );
}

function TableView() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const getData = () => {
        setLoad(true)
        personList().then(res =>
            setData(res.data)
        ).then(() => setLoad(false))
    }
    useEffect(() => {
        getData()
    }, []);
    const handleRemove = (data) => {
        const dialog = DialogPlugin({
            header: '提示',
            body: '您确定要删除该用户吗?',
            onConfirm: ({e}) => {
                personRemove({uid: data}).then(res => {
                    if (res.code === 200) {
                        MessagePlugin.success(res.msg)
                        getData()
                    } else {
                        MessagePlugin.error(res.msg)
                    }
                })
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
    const columns = [
        {
            title: '账号',
            colKey: 'account',
            align: 'center',
        },
        {
            title: '邮箱',
            colKey: 'email',
            align: 'center',
        },
        {
            title: '姓名',
            colKey: 'name',
            align: 'center',
        },
        {
            title: '注册日期',
            colKey: 'signdate',
            align: 'center',
        },
        {
            title: '操作栏',
            align: 'center',
            colKey: 'operate',
            cell: ({row}) => {
                return (
                    <div className="table-operations">
                        <Button theme="danger" hover="color" data-id={row.key} onClick={() => handleRemove(row.uid)}>
                            删除
                        </Button>
                    </div>
                );
            },
        },
    ]
    return (
        <Table
            className={'options'}
            style={{height: "76vh"}}
            loading={load}
            rowKey="key"
            columns={columns}
            data={data}
            table-layout="auto"
            bordered
            lazyLoad
        />
    );
}

export default UserManager
