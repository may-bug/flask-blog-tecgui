import {useEffect, useState} from 'react';
import {Button, DialogPlugin, List, MessagePlugin} from "tdesign-react";
import style from "./Comment.module.less"
import LoadingComponent from "@/components/LoadingComponent.jsx";
import {commentDelete, commentList} from "@/api/user.jsx";
import {formatDate} from "@/utils/Date.jsx";

const {ListItem, ListItemMeta} = List;

function Comment() {
    return (
        <div className={style.comments}>
            <h5>评论列表</h5>
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
                <>
                    {data.length === 0 ? (
                        <div style={{color: "#0052d9", fontSize: "15px", textAlign: "center"}}>
                            <h3>空空如也</h3>
                        </div>
                    ) : (
                        <List loading={load} className={'options'} style={{height: "75.5vh", overflowY: "scroll"}}>
                            {data.map((item) => (
                                <ListItem key={item.uid} action={<Button theme="danger"
                                                                         onClick={() => handleRemove(item.uid)}>删除</Button>}>
                                    <ListItemMeta title={"文章: " + item.title}
                                                  description={(
                                                      <div className={style.commentFooter}>
                                                          <p>评论内容: {item.content}</p>
                                                          <span>评论时间: {formatDate(item.datetime)}</span>
                                                      </div>)}/>
                                </ListItem>
                            ))}
                        </List>)}
                </>)}
        </>

    )
}

export default Comment;
