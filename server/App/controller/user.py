import datetime
import os
import uuid
from flask import Blueprint, request, session
from sqlalchemy import func
from werkzeug.utils import secure_filename
from App.ext import db
from App.models import User, Page, Comment
from App.config import UPLOAD_FOLDER, SERVER_FILE_BASE
from App.utils.other import allowed_file
from App.utils.response import Response

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

user_api = Blueprint("user_api", __name__)


# 登录
@user_api.post('/login')
def login():
    account = request.values.get('account')
    password = request.values.get('password')
    u = User.query.filter_by(account=account).first()
    if u is None:
        return Response(500, "账号不存在", None)
    else:
        if password == u.password:
            if u.role == "admin":
                session['role'] = u.role
            session['identy'] = u.uid
            session.permanent = True
            return Response(200, "登录成功", None)
        else:
            return Response(403, "密码错误", None)


# 退出登录
@user_api.post('/logout')
def logout():
    session.pop('identy')
    session.pop("role")
    return Response(200, "注销成功", None)


# 注册
@user_api.post('/sign')
def sign():
    account = request.values.get('account')
    password = request.values.get('password')
    email = request.values.get('email')
    u = User.query.filter_by(account=account).first()
    v = User.query.filter_by(email=email).first()
    if u is None:
        return Response(500, "账号已经存在", None)
    if v is None:
        return Response(500, "邮箱已经存在", None)
    else:
        u = User()
        u.uid = str(uuid.uuid4()).replace("-", "")
        u.signdate = datetime.datetime.now()
        u.email = email
        u.account = account
        u.role = 'member'
        u.password = password
        try:
            db.session.add(u)
            db.session.commit()
        except:
            db.session.rollback()
            return Response(500, "服务器错误,注册失败", None)
        return Response(200, "注册成功", None)


# 信息
@user_api.post('/info')
def info():
    uid = session.get('identy')
    u = User.query.filter_by(uid=uid).one()
    u.password = ""
    u.uid = ""
    return Response(200, "请求成功", u.to_dict())


# 检查
@user_api.post('/check')
def check():
    return Response(200, "已登录", None)


# 统计信息
@user_api.post('/sta')
def pageInfo():
    uid = session.get('identy')
    p = db.session.query(Page).filter_by(user=uid).count()
    star_sum = db.session.query(func.sum(Page.star)).filter_by(user=uid).scalar() or 0
    pages = db.session.query(Page).filter_by(user=uid).all()
    page_ids = [page.uid for page in pages]
    if page_ids:
        c = db.session.query(Comment).filter(Comment.pagesid.in_(page_ids)).count()
    else:
        c = 0
    return Response(200, "请求成功", {
        'pages': p,
        'stars': star_sum,
        'comments': c
    })


# 修改密码
@user_api.post('/updatepwd')
def passwordUpdate():
    new = request.values.get('new')
    old = request.values.get('old')
    uid = session.get('identy')
    u = User.query.filter_by(uid=uid).one()
    if u.password == old:
        try:
            u.password = new
            db.session.commit()
            session.pop('identy')
            return Response(200, "修改成功,请重新登录", None)
        except:
            db.session.rollback()
            return Response(500, "修改失败", None)
        finally:
            db.session.close()
    else:
        return Response(500, "原密码错误", None)


# 修改信息
@user_api.post('/updateinfo')
def infoUpdate():
    uid = session.get('identy')
    u = User.query.filter_by(uid=uid).one()
    if request.values.get('email') is not None:
        u.email = request.values.get('email')
    if request.values.get('name') is not None:
        u.name = request.values.get('name')
    if request.values.get('sex') is not None:
        u.sex = request.values.get('sex')
    if request.values.get('brith') is not None:
        u.brith = request.values.get('brith')
    try:
        db.session.commit()
        return Response(200, "修改成功", None)
    except:
        db.session.rollback()
        return Response(500, "修改失败", None)
    finally:
        db.session.close()


# 修改头像
@user_api.post('/image')
def image():
    if 'file' not in request.files:
        return Response(400, "No file part", None)
    file = request.files['file']
    if file.filename == '':
        return Response(400, "No selected file", None)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        new_filename = f"{uuid.uuid4().hex}.{filename}"
        file_path = os.path.join(UPLOAD_FOLDER, new_filename)
        file.save(file_path)
        file_url = os.path.join(UPLOAD_FOLDER, new_filename)
        uid = session.get('identy')
        u = User.query.filter_by(uid=uid).one()
        url = file_url.replace("App", SERVER_FILE_BASE)
        u.url = url
        try:
            db.session.commit()
            return Response(200, "修改成功", {
                'url': url
            })
        except Exception as e:
            print(e)
            db.session.rollback()
            return Response(500, "修改失败", None)
        finally:
            db.session.close()
    return Response(500, "修改失败", None)


# 获取头像地址
@user_api.get('/avatar')
def getUrl():
    uid = session.get('identy')
    url = User.query.filter_by(uid=uid).one().url
    return Response(200, "请求成功", url)


# 我的评论
@user_api.get('/comments')
def commentList():
    uid = session.get('identy')
    comments = db.session.query(
        User.url,
        User.name,
        Comment.uid,
        Comment.datetime,
        Comment.content,
        Page.title
    ).join(
        User, User.uid == Comment.user
    ).join(
        Page, Page.uid == Comment.pagesid
    ).filter(
        Comment.user == uid
    ).order_by(Comment.datetime).all()
    comment_list = [{
        'url': comment.url,
        'name': comment.name,
        'uid': comment.uid,
        'datetime': comment.datetime.strftime("%Y-%m-%d %H:%M:%S"),
        'content': comment.content,
        'title': comment.title
    } for comment in comments]
    return Response(200, "请求成功", comment_list)


# 删除评论
@user_api.post('/commentdel')
def commentDel():
    uid = request.values.get('uid')
    c = Comment.query.filter_by(uid=uid).one()
    try:
        db.session.delete(c)
        db.session.commit()
        return Response(200, "删除成功", None)
    except:
        db.session.rollback()
        return Response(500, "删除失败", None)
    finally:
        db.session.close()
