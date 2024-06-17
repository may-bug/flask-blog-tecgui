import uuid

from App.config import ALLOWED_EXTENSIONS


# 判断允许上传的文件格式
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# uuid生成
def uuidStr():
    temp = str(uuid.uuid4()).replace("-", "")
    if temp.__len__() > 11:
        temp = temp[0:10]
    return temp
