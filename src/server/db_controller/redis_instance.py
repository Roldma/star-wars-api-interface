import redis

db = redis.Redis(host="localhost", port=6379, db=0)


def db_test():
    db.set("foo", "chunks")
    print(db.get("foo"))
    pass
