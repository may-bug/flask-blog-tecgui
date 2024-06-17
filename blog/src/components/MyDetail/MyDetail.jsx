import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {onePage} from "@/api/page.jsx";
import {Button, Comment, Divider, List, Rate, Space} from 'tdesign-react';
import style from "./MyDetail.module.less"
import {commentList} from "@/api/comment.jsx";
import {formatDate} from "../../utils/Date.jsx";
import LoadingComponent from "@/components/LoadingComponent.jsx";

const {ListItem} = List;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function MyDetail() {
    const query = useQuery();
    const uid = query.get('pageid');
    const [page, setPage] = useState({})
    const [comment, setComment] = useState([])
    const navigate = useNavigate()
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
    return (
        <div className={style.detail}>
            {load ? <LoadingComponent size={"large"}/> : (
                <>
                    <Button onClick={() => navigate('/person/mypage')}>返回</Button>
                    <div className={style.main}>
                        <h3>
                            {page.title}
                        </h3>
                        <h4>
                            发布时间:{formatDate(page.insertdatetime)}
                        </h4>
                        {page.updatetime === null ? "" : (<h4>
                            {"修改时间:" + formatDate(page.updatetime)}
                        </h4>)}
                        <p dangerouslySetInnerHTML={{__html: page.content}}/>
                        <Space className={style.rate}><Rate count={1} defaultValue={1}/>{page.star}</Space>
                    </div>
                    <Divider content={"评论"}/>
                    <div className={style.comment}>
                        <ListComment comment={comment}/>
                    </div>
                </>)}
        </div>
    );
}

function ListComment(props) {
    // eslint-disable-next-line react/prop-types
    const {comment} = props
    return (
        <List split={true}>
            {/* eslint-disable-next-line react/prop-types */}
            {comment.map((item) => (
                <ListItem key={item.uid}>
                    <Comment
                        avatar={item.url ? item.url : "/api/static/images/user.svg"}
                        author={item.name ? item.name : "匿名评论"}
                        datetime={formatDate(item.datetime)}
                        content={item.content}
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default MyDetail;
