#!/bin/sh

docker system prune --force
rm -rf backend/.venv
docker build -t stimson-web-curator-api . 
docker run -p 80:8000 -it stimson-web-curator-api
