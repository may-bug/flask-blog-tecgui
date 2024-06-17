import datetime
from flask import Blueprint, request, session
from sqlalchemy import desc

from App.ext import db
from App.models import Comment, User
from App.utils.other import uuidStr
from App.utils.response import Response

comment_api = Blueprint("comment_api", __name__)


# 发表评论
@comment_api.post('/add')
def commentAdd():
    c = Comment()
    c.user = session.get('identy')
    c.uid = uuidStr()
    c.content = request.values.get('content')
    c.pagesid = request.values.get('uid')
    c.star = 0
    c.datetime = datetime.datetime.now()
    try:
        db.session.add(c)
        db.session.commit()
        return Response(200, "评论成功", None)
    except Exception as e:
        print(e)
        db.session.rollback()
        return Response(500, "评论失败", None)
    finally:
        db.session.close()


# 文章评论列表
@comment_api.get('/list')
def listComment():
    uid = request.values.get('uid')
    comments = db.session.query(
        User.url,
        User.name,
        Comment.uid,
        Comment.datetime,
        Comment.content,
    ).join(
        User, User.uid == Comment.user
    ).filter(
        Comment.pagesid == uid
    ).order_by(desc(Comment.datetime)).all()
    comment_list = [{
        'url': comment.url,
        'name': comment.name,
        'uid': comment.uid,
        'datetime': comment.datetime.strftime("%Y-%m-%d %H:%M:%S"),
        'content': comment.content
    } for comment in comments]
    return Response(200, "请求成功", comment_list)
