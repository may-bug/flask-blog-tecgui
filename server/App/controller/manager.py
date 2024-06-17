from flask import Blueprint, request, session
from sqlalchemy import desc

from App.ext import db
from App.models import User, Page, Comment
from App.utils.response import Response

manager_api = Blueprint("manager_api", __name__)


# 用户列表
@manager_api.get("/personlist")
def personList():
    r = User.query.order_by(User.signdate).all()
    result = []
    for i in r:
        i.password = None
        result.append(i.to_dict())
    return Response(200, "请求成功", result)


# 删除用户
@manager_api.post("/personremove")
def personRemove():
    uid = request.values.get("uid")
    u = User.query.filter_by(uid=uid).one()
    try:
        db.session.delete(u)
        db.session.commit()
        return Response(200, "删除成功", None)
    except Exception as e:
        db.session.rollback()
        return Response(500, "删除失败", None)
    finally:
        db.session.close()


# 文章列表
@manager_api.get("/pagelist")
def pageList():
    result = Page.query.order_by(desc(Page.insertdatetime)).all()
    temp = [r.to_dict() for r in result]
    return Response(200, "请求成功", temp)


# 删除文章
@manager_api.post('/pagedel')
def delete():
    p = Page.query.filter_by(uid=request.values.get('uid')).one()
    c = Comment.query.filter_by(pagesid=request.values.get('uid')).all()
    try:
        for cl in c:
            db.session.delete(cl)
        db.session.delete(p)
        db.session.commit()
        return Response(200, "删除成功", None)
    except Exception as e:
        db.session.rollback()
        return Response(500, "删除失败", None)
    finally:
        db.session.close()


# 评论列表
@manager_api.get('/comments')
def commentList():
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
    ).order_by(desc(Comment.datetime)).all()
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
@manager_api.post('/commentdel')
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
