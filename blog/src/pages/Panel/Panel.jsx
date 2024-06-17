import {useEffect, useState} from 'react';
import {Divider, Image, Link, Space, Statistic} from "tdesign-react";
import style from "./Panel.module.less"
import {pageInfo} from "@/api/user.jsx";
import LoadingComponent from "@/components/LoadingComponent.jsx";
import ME from "@/assets/images/me.svg";

function Panel() {
    const [num, setNum] = useState({
        stars: 0,
        pages: 0,
        comments: 0
    })
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        pageInfo().then(res => {
            setNum(res.data)
        }).then(() => setLoad(false))
    }, [])
    return (
        <div className={style.panel}>
            <div className={style.content}>
                <div className={style.statistic}>
                    {load ? <LoadingComponent/> : (
                        <div className={style.top}>
                            <Space size={100}>
                                <Statistic title="总赞数" value={num.stars} unit=""/>
                                <Statistic title="总文章数" value={num.pages} unit=""/>
                                <Statistic title="总评论数" value={num.comments} unit=""/>
                            </Space>
                        </div>)}
                    <Divider/>
                    <div className={style.other}>
                    </div>
                </div>
                <div className={style.right}>
                    <h3>欢迎使用TECGUI博客1.0版本</h3>
                    <h4>下面是一些相关的项目列表:</h4>
                    <div className={style.link}>
                        <Link hover='color' href='https://tecgui.cn'>网站域名首页</Link><br/>
                        <Link hover='color' href='https://car.tecgui.cn'>车险智能分析平台</Link><br/>
                        <Link hover='color' href='https://blog.tecgui.cn'>TECGUI博客</Link><br/>
                    </div>
                    <Divider/>
                </div>
            </div>
            <Image src={ME} className={style.image} width="100%" loading={<LoadingComponent/>}/>
        </div>
    );
}

export default Panel;
