import {useEffect, useState} from 'react';
import {Button, Input, MessagePlugin, Space, Upload} from "tdesign-react";
import "./Edotor.css"
import {addPage, onePage, updatePage} from "@/api/page.jsx";
import EditorNew from "@/components/Editor/EditorComponent.jsx";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const EditorView = () => {
    const query = useQuery();
    const uid = query.get('pageid');
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [page, setPage] = useState({
        content: content,
        title: title,
        image: "",
        uid: ""
    })
    useEffect(() => {
        if (uid !== null) {
            onePage({uid: uid}).then(res => {
                setPage(res.data)
                setContent(res.data.content)
                setTitle(res.data.title)
            })
        }
    }, [uid])
    const upload = (res, file) => {
        setPage({
            image: res.response.data.url,
            content: content,
            title: title,
            uid: page.uid
        })
    }
    const submit = () => {
        if (uid === null) {
            setPage({
                image: page.image,
                content: content,
                title: title,
            })
            if (page.title === null) {
                MessagePlugin.warning("标题为必填项")
            } else if (page.content === null) {
                MessagePlugin.warning("内容不能为空")
            } else {
                addPage(page).then(res => {
                    if (res.code === 200) {
                        MessagePlugin.success(res.msg)
                        setContent("")
                        setTitle("")
                    } else {
                        MessagePlugin.error(res.msg)
                    }
                })
            }
        } else {
            setPage({
                image: page.image,
                content: content,
                title: title,
                uid: page.uid
            })
            if (page.title === '') {
                MessagePlugin.warning("标题不能为空")
            } else if (page.content === '') {
                MessagePlugin.warning("内容不能为空")
            } else {
                updatePage(page).then(res => {
                    if (res.code === 200) {
                        MessagePlugin.success(res.msg)
                        setContent("")
                        setTitle("")
                    } else {
                        MessagePlugin.error(res.msg)
                    }
                })
            }
        }
    }
    return (
        <div>
            <Space size={200} className="space-top">
                <div>
                    <Input
                        className={"input"}
                        type="text"
                        placeholder="请输入标题"
                        value={title}
                        onChange={(value, e) => {
                            setTitle(value)
                        }
                        }
                        onBlur={(value, e) => {
                            setTitle(value)
                        }}
                        style={{marginBottom: '10px', width: '40vw', padding: '5px'}}
                    />
                </div>
                <div>
                    <h5 style={{textAlign: "center"}}>封面上传</h5>
                    <Upload
                        className="upload"
                        action="/api/file/image"
                        autoUpload
                        method="POST"
                        showUploadProgress
                        theme="image"
                        useMockProgress
                        formatResponse
                        onSuccess={upload}
                    />
                </div>
                <Button className="submit" onClick={submit}>提交</Button>
            </Space>
            <EditorNew
                content={content}
                setContent={setContent}
            />
        </div>
    );
};

export default EditorView;
