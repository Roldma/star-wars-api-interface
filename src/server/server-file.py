import sys
import os

from flask import Flask, render_template, request
from api import recent_search
from api.search_response import create_search_results


app = Flask(__name__, static_folder="../../static", template_folder="../../public")

print(sys.path)
print(create_search_results)


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
    results = create_search_results(query)
    return results


@app.route("/api/recent/<resource>/", methods=["POST", "GET", "DELETE"])
def recent_search_list(resource):
    if resource == "list":
        if request.method == "GET":
            return recent_search.get_recent()

        elif request.method == "POST":
            json_data = request.get_json()
            query = json_data["input"]

            recent_search.update_recent(query)
            return "Recent Search List updated"

        elif request.method == "DELETE":
            recent_search.clear_recent()
            return "Recent Search list cleared"


### COMMANd flask run -h localhost -p 6868
if __name__ == "main":
    app.run()

