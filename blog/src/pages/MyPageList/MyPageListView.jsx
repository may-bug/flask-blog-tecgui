import style from './MyPageListView.module.less'
import React, {useEffect, useState} from "react";
import {delPage, myList} from "@/api/page.jsx";
import {useNavigate} from "react-router-dom";
import {Button, DialogPlugin, Image, MessagePlugin, Space} from "tdesign-react";
import bg from "@/assets/images/page.jpg";
import LoadingComponent from "@/components/LoadingComponent.jsx";
import {formatDate} from "@/utils/Date.jsx";

export default function MyPageListView() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        myList().then(res => {
            setListData(res.data)
        }).then(() => setLoad(false))
    }, [])
    const toDetail = (data) => {
        navigate(`/person/detail?pageid=${data}`)
    }
    const handelDelPage = (uid) => {
        const dialog = DialogPlugin({
            header: '提示',
            body: '您确定要删除文章吗?',
            onConfirm: ({e}) => {
                delPage({uid: uid}).then((res) => {
                    if (res.code === 200) {
                        MessagePlugin.success(res.msg)
                        setListData(listData.filter(item => {
                            return item.uid !== uid
                        }))
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
    const [listData, setListData] = useState([]);
    return (
        <div className={style.listView}>
            <h5>我的文章</h5>
            {load ? (<LoadingComponent/>) : (
                <>
                    {listData.length === 0 ? (
                        <div style={{color: "#0052d9", fontSize: "15px", textAlign: "center"}}>
                            <h3>空空如也</h3>
                        </div>
                    ) : (<>
                        <div className={style.itemList}>
                            {listData.length === 0 ? "" : (listData.map((item) => (
                                <div key={item.uid}>
                                    <div className={'options'} style={{margin: "0 10px 10px 10px"}}>
                                        <div className={style.item}>
                                            <div className={style.left} onClick={() => toDetail(item.uid)}>
                                                <Image alt={''}
                                                       src={item.imageurl === null || item.imageurl === "" ? bg : item.imageurl}
                                                       height='150px'
                                                       width='150px' fit={'cover'} shape="round"
                                                       loading={<LoadingComponent/>}/>
                                            </div>
                                            <div className={style.right}>
                                                <h3>{item.title}</h3>
                                                <div className={style.footer}>
                                                    <span
                                                        className={style.insert}>发布时间:{formatDate(item.insertdatetime)}</span>
                                                    {item.updatetime === null ? "" : (
                                                        <span>{'修改时间:' + formatDate(item.updatetime)}</span>)}
                                                    <span className={style.star}>点赞数:{item.star}</span>
                                                </div>
                                            </div>
                                            <div className={style.action}>
                                                <Space>
                                                    <Button
                                                        onClick={() => navigate(`/person/editor?pageid=${item.uid}`)}>编辑</Button>
                                                    <Button theme="danger"
                                                            onClick={() => handelDelPage(item.uid)}>删除</Button>
                                                </Space>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </>)}
                </>)}
        </div>
    );
}
