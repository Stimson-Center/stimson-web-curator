#!/bin/sh

docker system prune --force
rm -rf backend/.venv
docker build -t stimson-web-curator-ui . 
docker run --user ubuntu -p 3000:3000 -it stimson-web-curator-ui
