#!/bin/sh
npm run build
export FLASK_APP=./src/server/server-file.py
export FLASK_ENV=development
export PORT=6868
flask run -h localhost -p 6868
