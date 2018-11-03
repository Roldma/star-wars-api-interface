#!/bin/sh
npm run build
pipenv shell
export FLASK_APP=./src/server/server-file.py
export FLASK_ENV=development
flask run -h localhost -p 6969