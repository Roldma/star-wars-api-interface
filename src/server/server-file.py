import api_controller

from api_controller import SearchResults
from flask import Flask, render_template

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    return render_template("index.html")


@app.route("/scripts/bundle.js")
def scripts():
    return app.send_static_file("bundle.js")


@app.route("/characters")
def characters():
    return app.send_static_file("characters.json")


@app.route("/img/404/star-wars404.jpg")
def img404():
    return app.send_static_file("star-wars404.jpg")


@app.route("/api/search/<query_string>")
def get_search_results(query_string):
    results = SearchResults.create_search_results(query_string)
    print("AFTER NEW INSTANCE", results)
    return results


### COMMANd flask run -h localhost -p 6969
if __name__ == "main":
    app.run()

