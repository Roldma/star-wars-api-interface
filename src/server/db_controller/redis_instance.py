import redis

redis_pool = None


def initConn():
    global redis_pool
    redis_pool = redis.ConnectionPool(host="localhost", port=6969, db=0)


class RedisConnection:
    def __init__(self):
        self._redis_conn = redis.Redis(connection_pool=redis_pool)

    def update_recent_search(self, search_str):
        self._redis_conn.sadd("recent:search", search_str)

    def get_recent_search(self):
        rec_search = self._redis_conn.get("recent:search")
        print("RECENT SEARCH returned by REDIS", rec_search)
        return rec_search


def redis_conn():
    initConn()
    db = RedisConnection()
    return db

