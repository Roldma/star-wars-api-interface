import api_controller
import db_controller

from flask import Flask, render_template, request

from db_controller import redis_instance
from api_controller import SearchResults

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    return render_template("index.html")


@app.route("/scripts/bundle.js")
def bundle():
    return app.send_static_file("bundle.js")


@app.route("/scripts/bundle.js")
def bundle_map():
    return app.send_static_file("bundle.js.map")


@app.route("/characters")
def characters():
    return app.send_static_file("characters.json")


@app.route("/img/404/star-wars404")
def img404():
    return app.send_static_file("star-wars404.jpg")


@app.route("/api/search/")
def search():
    """
    Request Arguments (request.args)
    ----------
    category: string
    string: string 
    """

    input_string = request.args["string"]
    category = request.args["category"]
    print(input_string, category, "((((AS*D(AS*(D*")

    redis_connection = redis_instance.redis_conn()
    redis_connection.update_recent_search(input_string)

    query = (input_string, category)
    results = SearchResults.create_search_results(query)
    return results


@app.route("/api/recent-search-list")
def recent_search_list():
    conn = redis_instance.redis_conn()
    print(conn.get_recent_search())
    pass


### COMMANd flask run -h localhost -p 6969
if __name__ == "main":
    app.run()

