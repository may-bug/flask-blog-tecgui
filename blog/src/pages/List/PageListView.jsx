import style from './PageListView.module.less'
import {useEffect, useState} from "react";
import {list} from "@/api/page.jsx";
import {useNavigate} from "react-router-dom";
import {Image} from "tdesign-react";
import bg from "../../assets/images/page.jpg"
import LoadingComponent from "@/components/LoadingComponent.jsx";
import {formatDate} from "@/utils/Date.jsx";

export default function ListView() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        list().then(res => {
            setListData(res.data)
        }).then(() => setLoad(false))
    }, [])
    const toDetail = (data) => {
        navigate(`/detail?pageid=${data}`)
    }
    const [listData, setListData] = useState([]);
    return (
        <div className={style.listView}>
            {load ? (<div>
                    <LoadingComponent/>
                </div>) :
                (<div className={style.itemList}>
                    {listData === null ? '' : listData.map((item) => (
                        <div key={item.uid} onClick={() => toDetail(item.uid)}>
                            <div className={'options'} style={{margin: "0 10px 10px 10px"}}>
                                <div className={style.item}>
                                    <div className={style.left}>
                                        <Image alt={''}
                                               src={item.imageurl === null || item.imageurl === "" ? bg : item.imageurl}
                                               height='150px'
                                               width='150px' fit={'cover'} shape="round" loading={<LoadingComponent/>}/>
                                    </div>
                                    <div className={style.right}>
                                        <h3>{item.title}</h3>
                                        <p dangerouslySetInnerHTML={{__html: item.content}}/>
                                        <div className={style.footer}>
                                            <span
                                                className={style.insert}>发布时间:{formatDate(item.insertdatetime)}</span>
                                            {item.updatetime === null ? "" : (
                                                <span>{'修改时间:' + formatDate(item.updatetime)}</span>)}
                                            <span className={style.star}>点赞数:{item.star}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}
        </div>
    );
}
