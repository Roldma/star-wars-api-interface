import api_controller
import db_controller

from flask import Flask, render_template, request

from dbcontroller import redis_instance
from api import search_response, recent_search

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    return render_template("index.html")


@app.route("/scripts/bundle.js")
def bundle():
    return app.send_static_file("bundle.js")


@app.route("/scripts/bundle.js.map")
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
    Makes request to official star wars API for searching
    
    Request Arguments (request.args)
    ----------
    category: string
        category to use in request to SWAPI
    input_str: string 
        search term to request to SWAPI
    """

    query = (request.args["category"], request.args["input_str"])
    results = search_response.create_search_results(query)
    return results


@app.route("/api/recent-search-list", methods=["POST", "GET"])
def recent_search_list():
    if request.method == "GET":
        return recent_search.get_recent()
    elif request.method == "POST":
        query = request.args["query"]
        return recent_search.update_recent(query)


### COMMANd flask run -h localhost -p 6969
if __name__ == "main":
    app.run()

