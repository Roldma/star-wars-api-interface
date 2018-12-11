import os

production = os.environ["FLASK_ENV"] == "production"
protocol = "https" if production else "http"
host = os.environ["HOST_NAME"] or "localhost"
port = os.environ["PORT"] or 3000

dev = (protocol, host, port)
prod = (protocol, host)

url = "{}://{}:{}".format(*dev) if not production else "{}://{}".format(*prod)

print(url)
