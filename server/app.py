from App import create_app

app = create_app()

# 启动入口
if __name__ == '__main__':
    app.run(debug=True, port=6089)

# App/Controller 蓝图
# static 静态资源
# utils 工具
