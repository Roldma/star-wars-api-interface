#!/bin/sh
export FLASK_APP=./src/server/server.py
source $(pipenv --venv)/bin/activate
flask run -h localhost -p 6969