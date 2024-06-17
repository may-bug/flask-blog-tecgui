# 返回函数
def Response(code: int, msg: str, data):
    return dict(HttpResponse(code, msg, data))


# 统一返回格式
class HttpResponse:
    def __init__(self, code: int, msg: str, data):
        self.code = code
        self.msg = msg
        self.data = data

    def keys(self):
        return ['code', 'msg', 'data']

    def __getitem__(self, item):
        return getattr(self, item)
