import redis
from flask import make_response, jsonify

redis_pool = None


def initConn():
    global redis_pool
    redis_pool = redis.ConnectionPool(host="localhost", port=6969, db=0)


class RedisConnection:
    def __init__(self, recent_search_list=None):
        self._redis_conn = redis.Redis(connection_pool=redis_pool)
        self.recent_search_list = recent_search_list

    @property
    def recent_search_list(self):
        return self._recent_search_list

    @recent_search_list.setter
    def recent_search_list(self, value):
        r_set_name = "recent:search"
        r_set_members = self._redis_conn.smembers(r_set_name)

        search_list = [
            self.decoder(member)
            for member in r_set_members
            if len(self.decoder(member)) > 0
        ]

        print(search_list)
        value = jsonify(search_list)
        self._recent_search_list = value

    def update_recent_search(self, search_str):
        self._redis_conn.sadd("recent:search", search_str)
        self._redis_conn.set("success", "true")
        print("member added to set")

    def decoder(self, item):
        return item.decode("utf-8")


def redis_conn():
    initConn()
    db = RedisConnection()
    return db

