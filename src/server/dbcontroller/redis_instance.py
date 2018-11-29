import redis
from flask import make_response, jsonify

redis_pool = None


def initConn():
    global redis_pool
    redis_pool = redis.ConnectionPool(host="localhost", port=6969, db=0)


class RedisConnection:
    def __init__(self, recent_search_list=None):
        self.redis_conn = redis.Redis(connection_pool=redis_pool)


def create_rconn():
    initConn()
    db = RedisConnection().redis_conn
    return db

