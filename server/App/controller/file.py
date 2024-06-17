import os
import uuid
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from App.config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS, SERVER_FILE_BASE
from App.utils.response import Response

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


file_api = Blueprint("file_api", __name__)


# 文章图片上传
@file_api.post('/image')
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
        url = file_url.replace("App", SERVER_FILE_BASE)
        return {
            "errno": 0,
            "data": {
                "url": url,
            }
        }
    return {
        "errno": 1,
        "message": "上传失败"
    }
