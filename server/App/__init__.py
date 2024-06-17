import os
from datetime import timedelta

from flask import Flask, request, session

from App.controller.comment import comment_api
from App.controller.file import file_api
from App.controller.manager import manager_api
from App.controller.page import page_api
from App.ext import init_ext
from App.controller.user import user_api
from App.utils.response import Response

# 数据库配置
host = "localhost"
database = "pymic"
user = "root"
password = "123456"
port = 3306
SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
exit_path = ['/user/login', '/user/sign', '/page/one', '/page/list', "/comment/list"]


# app统一配置
def create_app():
    app = Flask(__name__)
    app.register_blueprint(user_api, url_prefix='/user')
    app.register_blueprint(page_api, url_prefix='/page')
    app.register_blueprint(comment_api, url_prefix="/comment")
    app.register_blueprint(file_api, url_prefix="/file")
    app.register_blueprint(manager_api, url_prefix="/manager")
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SECRET_KEY'] = '318651394820240615'
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=3)  # 设置为1小时候过期
    app.config['ENV'] = 'production'
    init_ext(app)

    @app.before_request
    def before_req():
        if request.path in exit_path or request.path.startswith('/static'):
            pass
        else:
            # 登录判断
            if session.get('identy', None) is None:
                return Response(403, "未登录", None)
            else:
                if request.path in exit_path or request.path.startswith('/manager'):
                    # 权限判断
                    if session.get('role', None) is None:
                        return Response(403, "无权限", None)
                    else:
                        pass
                else:
                    pass

    return app
