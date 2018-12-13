import sys
import os
import search

print(search)
from flask import Flask, render_template, request
from search import search_controller
from search.search_controller import create_controller as search_controller

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    return render_template("index.html")


@app.route("/scripts/<jsfile>")
def script_file(jsfile):
    if jsfile == "bundle.js":
        return app.send_static_file("bundle.js")
    elif jsfile == "bundle.js.map":
        return app.send_static_file("bundle.js.map")


@app.route("/characters/")
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
    input: string 
        search term to request to SWAPI
    """

    query = (request.args["category"], request.args["input"])
    controller = search_controller(q=query, search_type="basic")
    results = controller.get_results()
    return results


@app.route("/api/recent/<resource>/", methods=["POST", "GET", "DELETE"])
def recent_search_list(resource):
    search_type = "recent"
    if resource == "list":
        if request.method == "GET":
            controller = search_controller(q=None, search_type=search_type)
            return controller.get_results()

        elif request.method == "POST":
            json_data = request.get_json()
            query = json_data["input"]
            controller = search_controller(q=query, search_type=search_type)
            controller.update_recent()
            return "Recent Search List updated"

        elif request.method == "DELETE":
            controller = search_controller(q=None, search_type=search_type)
            controller.clear_recent()
            return "Recent Search list cleared"


### COMMANd flask run -h localhost -p 6868
if __name__ == "main":
    app.run()

