#!/bin/sh

docker system prune --force
rm -rf backend/.venv
docker build -t stimson-web-curator-api . 
docker run -p 5000:8080 -it stimson-web-curator-api
