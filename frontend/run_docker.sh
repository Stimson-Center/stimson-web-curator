#!/bin/sh

docker system prune --force
if [ -d "build" ]; then rm -rf "build"; fi
docker build -t stimson-web-curator-ui .
docker run -p 80:80 -it stimson-web-curator-ui
