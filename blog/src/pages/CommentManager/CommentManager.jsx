import React, {useEffect, useState} from 'react';
import {Button, DialogPlugin, List, MessagePlugin} from "tdesign-react";
import style from "./CommentManager.module.less"
import LoadingComponent from "@/components/LoadingComponent.jsx";
import {commentDelete, commentList} from "@/api/manager.jsx";
import {formatDate} from "@/utils/Date.jsx";

const {ListItem, ListItemMeta} = List;

function CommentManager() {
    return (
        <div className={style.comments}>
            <h5>评论管理</h5>
            <CommentListView/>
        </div>
    );
}

function CommentListView() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const getData = () => {
        setLoad(true)
        commentList().then(res => {
            setData(res.data)
        }).then(() => setLoad(false))
    }
    useEffect(() => {
        getData()
    }, [])
    const handleRemove = (uid) => {
        const dialog = DialogPlugin({
            header: '提示',
            body: '您确定要删除文章吗?',
            onConfirm: ({e}) => {
                commentDelete({uid: uid}).then((res) => {
                    if (res.code === 200) {
                        MessagePlugin.success(res.msg)
                    } else {
                        MessagePlugin.error(res.msg)
                    }
                }).then(() => getData())
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
    return (
        <>
            {load ? <LoadingComponent/> : (
                <List loading={load} className={'options'} style={{height: "75.5vh", overflowY: "scroll"}}>
                    {data.map((item) => (
                        <ListItem key={item.uid}
                                  action={<Button theme="danger" onClick={() => handleRemove(item.uid)}>删除</Button>}>
                            <ListItemMeta loading={<LoadingComponent/>} title={"文章: " + item.title}
                                          description={(
                                              <div className={style.commentFooter}>
                                                  <p>评论内容: {item.content}</p>
                                                  <span>评论时间: {formatDate(item.datetime)}</span>
                                                  <span>评论者:{item.name}</span>
                                              </div>)}/>
                        </ListItem>
                    ))}
                </List>)}
        </>

    )
}

export default CommentManager;
