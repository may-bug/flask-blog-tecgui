import style from "./PageManager.module.less"
import {Button, DialogPlugin, Image, List, MessagePlugin} from "tdesign-react";
import {useEffect, useState} from "react";
import {pageList, pageRemove} from "@/api/manager.jsx";
import bg from "@/assets/images/page.jpg";
import LoadingComponent from "@/components/LoadingComponent.jsx";

const {ListItem, ListItemMeta} = List;

function PageManager() {

    return (
        <div className={style.manager}>
            <h5>文章管理</h5>
            <ListView/>
        </div>
    );
}

function ListView() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const getData = () => {
        setLoad(true)
        pageList().then(res => {
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
                pageRemove({uid: uid}).then((res) => {
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
                            <ListItemMeta image={<Image alt={''}
                                                        src={item.imageurl === null || item.imageurl === "" ? bg : item.imageurl}
                                                        fit={'cover'} loading={<LoadingComponent/>}/>}
                                          title={item.title}/>
                        </ListItem>
                    ))}
                </List>)}
        </>

    )
}

export default PageManager;
