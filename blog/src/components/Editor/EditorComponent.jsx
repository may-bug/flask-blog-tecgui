import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {useEffect, useState} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {MessagePlugin} from "tdesign-react";

function MyEditor(props) {
    // eslint-disable-next-line react/prop-types
    const {content, setContent} = props
    // editor 实例
    const [editor, setEditor] = useState(null)

    // 工具栏配置
    const toolbarConfig = {}

    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: '/api/file/image',
                fieldName: 'file',
                maxFileSize: 10 * 1024 * 1024, // 1M
                maxNumberOfFiles: 10,
                allowedFileTypes: ['image/*'],
                metaWithUrl: false,
                withCredentials: true,
                timeout: 5 * 1000,
                onBeforeUpload(file) {
                    return file
                },
                onProgress(progress) {
                    MessagePlugin.info(progress)
                },
                onSuccess(file, res) {
                    MessagePlugin.success(`${file.name} 上传成功`)
                },
                onFailed(file, res) {
                    MessagePlugin.error(`${file.name} 上传失败`)
                },
                onError(file, err, res) {
                    MessagePlugin.error(`${file.name} 上传出错`)
                },
            }
        }
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={content}
                    onCreated={setEditor}
                    onChange={editor => setContent(editor.getHtml())}
                    mode="default"
                    style={{height: '52vh', overflowY: 'hidden'}}
                />
            </div>
        </>
    )
}

export default MyEditor
