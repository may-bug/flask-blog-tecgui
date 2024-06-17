# coding: utf-8

from App.ext import db
from sqlalchemy_serializer import SerializerMixin

# 表实体类
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    uid = db.Column(db.String(255), primary_key=True)
    user = db.Column(db.ForeignKey('user.uid', onupdate='CASCADE'), index=True)
    content = db.Column(db.String(255))
    datetime = db.Column(db.DateTime)
    pagesid = db.Column(db.ForeignKey('pages.uid', onupdate='CASCADE'), index=True)
    commentid = db.Column(db.ForeignKey('comments.uid', onupdate='CASCADE'), index=True)
    star = db.Column(db.Integer)


class Config(db.Model, SerializerMixin):
    __tablename__ = 'config'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(255))
    stringvalue = db.Column(db.String(255))
    boolvalue = db.Column(db.Integer)
    numbervalue = db.Column(db.Integer)
    remark = db.Column(db.Text)


class Page(db.Model, SerializerMixin):
    __tablename__ = 'pages'

    uid = db.Column(db.String(11), primary_key=True)
    user = db.Column(db.ForeignKey('user.uid', onupdate='CASCADE'), index=True)
    title = db.Column(db.String(255), nullable=False)
    imageurl = db.Column(db.String(255))
    content = db.Column(db.Text, nullable=False)
    star = db.Column(db.Integer)
    insertdatetime = db.Column(db.Date)
    updatetime = db.Column(db.DateTime)

    # user1 = db.relationship('User', primaryjoin='Page.user == User.uid', backref='pages')


class User(db.Model, SerializerMixin):
    __tablename__ = 'user'

    uid = db.Column(db.String(255), primary_key=True)
    account = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    signdate = db.Column(db.DateTime)
    sex = db.Column(db.Enum('男', '女'))
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    brith = db.Column(db.DateTime)
    role = db.Column(db.Enum('admin', 'member'))
