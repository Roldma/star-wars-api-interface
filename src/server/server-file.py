import api_controller
import db_controller

from db_controller import redis_instance
from api_controller import SearchResults
from flask import Flask, render_template

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    redis_instance.db_test()
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


@app.route("/img/404/star-wars404.jpg")
def img404():
    return app.send_static_file("star-wars404.jpg")


@app.route("/api/search/<category>/<qstring>")
def get_search_results(category, qstring):
    print("in here")
    query = (category, qstring)
    results = SearchResults.create_search_results(query)
    return results


### COMMANd flask run -h localhost -p 6969
if __name__ == "main":
    app.run()

