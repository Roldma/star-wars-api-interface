from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder="../../static", template_folder="../../public")


@app.route("/")
def index_file():
    return render_template("index.html")


@app.route("/scripts/bundle.js")
def scripts():
    app.send_static_file("bundle.js")
    return app.send_static_file("bundle.js.map")


@app.route("/characters")
def characters():
    return app.send_static_file("characters.json")


@app.route("/search")
def get_search_results(req):
        

### COMMANd flask run -h localhost -p 6969
if __name__ == "main":
    app.run()

