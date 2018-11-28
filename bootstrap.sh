#!/bin/sh
npm run build
sudo /etc/init.d/redis_6969 start
export FLASK_APP=./src/server/server-file.py
export FLASK_ENV=development
flask run -h localhost -p 6868
