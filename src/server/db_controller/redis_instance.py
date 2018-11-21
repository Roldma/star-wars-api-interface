import redis

# db = redis.Redis(host="localhost", port=6379, db=0)

redis_pool = None


def initConn():
    global redis_pool
    redis_pool = redis.ConnectionPool(host="localhost", port=6379, db=0)


class RedisConnection:
    def __init__(self):
        self.redis_conn = redis.Redis(connection_pool=redis_pool)

    def update_recent_search(self, search_str):
        self.redis_conn.sadd("recent:search", search_str)


def redis_conn():
    initConn()
    db = RedisConnection()
    return db

