import datetime
from flask import Blueprint, request, session
from sqlalchemy import desc

from App.ext import db
from App.models import Page, Comment
from App.utils.other import uuidStr
from App.utils.response import Response

page_api = Blueprint("page_api", __name__)


# 新增文章
@page_api.post("/add")
def pageInsert():
    page = Page()
    page.user = session.get('identy')
    page.title = request.values.get('title')
    if request.values.get('image') is not None:
        page.imageurl = request.values.get('image')
    page.content = request.values.get('content')
    page.insertdatetime = datetime.datetime.now()
    page.uid = uuidStr()
    page.star = 0
    try:
        db.session.add(page)
        db.session.commit()
        return Response(200, "提交成功", None)
    except Exception as e:
        db.session.rollback()
        return Response(500, "提交失败", None)
    finally:
        db.session.close()


# 更新文章
@page_api.post("/update")
def pageUpdate():
    p = Page.query.filter_by(uid=request.values.get('uid')).one()
    if request.values.get('image') is not None:
        p.imageurl = request.values.get('image')
    p.title = request.values.get('title')
    p.content = request.values.get('content')
    p.updatetime = datetime.datetime.now()
    try:
        db.session.commit()
        return Response(200, "修改成功", None)
    except Exception as e:
        db.session.rollback()
        return Response(500, "修改失败", None)
    finally:
        db.session.close()


# 文章列表(公共部分)
@page_api.get('/list')
def pageList():
    result = Page.query.order_by(desc(Page.insertdatetime)).all()
    temp = [r.to_dict() for r in result]
    return Response(200, "请求成功", temp)


# 文章列表(我的文章)
@page_api.post('/mylist')
def myPageList():
    uid = session.get('identy')
    result = Page.query.filter_by(user=uid).order_by(desc(Page.insertdatetime)).all()
    temp = [r.to_dict() for r in result]
    return Response(200, "请求成功", temp)


# 单篇文章
@page_api.get('/one')
def page_one():
    result = Page.query.filter_by(uid=request.values.get('uid')).one()
    return Response(200, "请求成功", result.to_dict())


# 删除文章
@page_api.post('/del')
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


# 文章点赞
@page_api.post('/star')
def star():
    uid = request.values.get('uid')
    flag = request.values.get('star')
    r = Page.query.filter_by(uid=uid).one()
    if flag == '0':
        r.star = r.star + 1
    else:
        r.star = r.star - 1
    try:
        db.session.commit()
        if flag == '0':
            t = "Star成功"
        else:
            t = "Star取消"
        return Response(200, t, None)
    except:
        db.session.rollback()
        return Response(500, "失败", None)
    finally:
        db.session.close()
