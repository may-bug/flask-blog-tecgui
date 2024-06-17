import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {onePage, starPage} from "@/api/page.jsx";
import {Button, Comment, Divider, List, MessagePlugin, NotificationPlugin, Rate, Space, Textarea} from 'tdesign-react';
import {ChatIcon, ThumbUpIcon} from 'tdesign-icons-react';
import style from "./Detail.module.less"
import {commentAdd, commentList} from "@/api/comment.jsx";
import {getUrl} from "@/api/user.jsx";
import {formatDate} from "@/utils/Date.jsx";
import LoadingComponent from "@/components/LoadingComponent.jsx";

const {ListItem} = List;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Detail() {
    const query = useQuery();
    const uid = query.get('pageid');
    const [page, setPage] = useState({})
    const [comment, setComment] = useState([])
    const [star, setStar] = useState(0)
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        onePage({uid: uid}).then(res => {
            setPage(res.data)
        }).then(() => {
            commentList({uid: uid}).then(res => {
                setComment(res.data)
            }).then(() => {
                setLoad(false)
            })
        })
    }, [uid])
    const handelStar = (e) => {
        starPage({uid: uid, star: star}).then(res => {
            if (res.code === 200) {
                MessagePlugin.success(res.msg)
                if (star) {
                    setStar(0)
                    setPage({
                        content: page.content,
                        imageurl: page.imageurl,
                        insertdatetime: page.insertdatetime,
                        star: page.star - 1,
                        title: page.title,
                        uid: page.uid,
                        updatetime: page.updatetime,
                        user: page.user
                    })
                } else {
                    setStar(1)
                    setPage({
                        content: page.content,
                        imageurl: page.imageurl,
                        insertdatetime: page.insertdatetime,
                        star: page.star + 1,
                        title: page.title,
                        uid: page.uid,
                        updatetime: page.updatetime,
                        user: page.user
                    })
                }
            } else {
                MessagePlugin.warning(res.msg)
            }
        })
    }
    return (
        <div className={style.detail}>
            {load ? (<div style={{height: "80vh"}}>
                <LoadingComponent/>
            </div>) : (
                <>
                    <div className={style.main}>
                        <h3>
                            {page.title}
                        </h3>
                        <h4>
                            发布时间:{formatDate(page.insertdatetime)}
                        </h4>
                        {page.updatetime === null ? "" : (<h4>
                            修改时间:{formatDate(page.updatetime)}
                        </h4>)}
                        <p className={style.content}
                           dangerouslySetInnerHTML={{__html: page.content}}/>
                        <Space className={style.rate}><Rate valeu={star} count={1} defaultValue={star}
                                                            onChange={(e) => handelStar(e)}/>{page.star}</Space>
                    </div>
                    <Divider content={"评论"}/>
                    <div>
                        <ListComment comment={comment} uid={uid} setComment={setComment}/>
                    </div>
                </>
            )}
        </div>
    )
}

function ListComment(props) {
    // eslint-disable-next-line react/prop-types
    let {comment, setComment, uid} = props
    const actions = [
        <React.Fragment key="ThumbUp">
            <ThumbUpIcon size="16px"/>
            <span></span>
        </React.Fragment>,
        <React.Fragment key="Chat">
            <ChatIcon size="16px"/>
            <span>回复</span>
        </React.Fragment>,
    ];
    return (
        <List split={true}>
            <BasicComment uid={uid} comment={comment} setComment={setComment}/>
            {/* eslint-disable-next-line react/prop-types */}
            {comment.map((item) => (
                <ListItem key={item.uid}>
                    <Comment
                        avatar={item.url ? item.url : "/api/static/images/user.svg"}
                        author={item.name ? item.name : "匿名评论"}
                        datetime={formatDate(item.datetime)}
                        content={item.content}
                        actions={actions}
                    />
                </ListItem>
            ))}
        </List>
    );
}

function BasicComment(props) {
    const [replyData, setReplayData] = useState('');
    const [image, setImage] = useState(null)
    // eslint-disable-next-line react/prop-types
    let {uid, setComment} = props
    useEffect(() => {
        getUrl().then(res => {
            if (res.data !== null)
                setImage(res.data)
        })
    }, []);

    function submitReply() {
        commentAdd({content: replyData, uid: uid}).then(res => {
            NotificationPlugin(res.code === 200 ? "success" : "warning", {
                title: res.msg,
                content: res.code === 200 ? replyData : "请登录重试",
                duration: 3000,
            });
            if (res.code === 200) {
                commentList({uid: uid}).then(res => {
                    setComment(res.data)
                })
            }
        })
    }

    const replyForm = (
        <Space direction="vertical" align="end" style={{width: '100%'}}>
            <Textarea placeholder="请输入内容" value={replyData} onChange={setReplayData}/>
            <Button style={{float: 'right'}} onClick={submitReply}>发表</Button>
        </Space>
    );

    return <Comment avatar={image ? image : "/api/static/images/user.svg"} content={replyForm}/>;
}

export default Detail;
