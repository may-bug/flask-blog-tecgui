import React from 'react';
import {Descriptions, Divider, Link, Space, Timeline} from "tdesign-react";
import style from "./About.module.less"
import {LogoGithubIcon} from "tdesign-icons-react";

const {DescriptionsItem} = Descriptions

function About() {
    return (
        <div className={style.about}>
            <div>
                <h1>React + Flask</h1>
                <h2>TDesign + Axios + mysql</h2>
                <h3>session</h3>
            </div>
            <Divider content={"项目地址"}/>
            <Space className={style.project}>
                <Link hover="color" href="https://github.com/may-bug/flask-blog-tecgui"><LogoGithubIcon size={50}/></Link>
            </Space>
            <Divider content={"网站信息"}/>
            <Descriptions
                itemLayout="horizontal"
                layout="horizontal"
                size="medium"
            >
                <DescriptionsItem label="Author">
                    May-bug
                </DescriptionsItem>
                <DescriptionsItem label="Github">
                    https://github.com/may-bug
                </DescriptionsItem>
                <DescriptionsItem label="Email">
                    3186513948@qq.com
                </DescriptionsItem>
                <DescriptionsItem label="Domain">
                    tecgui.cn
                </DescriptionsItem>
            </Descriptions>
            <Divider content={"更新日志"}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Timeline mode="same">
                    <Timeline.Item label="2026-06-16">
                        <h4>Version 1.0.0</h4>
                        <p>完成整体框架</p>
                        <ul>已知问题:
                            <li>进入编辑器的首次提交错误提示</li>
                        </ul>
                    </Timeline.Item>
                    <Timeline.Item label="未知">
                        <h5>Version 1.0.1</h5>
                        <p>新增未知功能</p>
                    </Timeline.Item>
                </Timeline>
            </div>
        </div>
    );
}

export default About;
