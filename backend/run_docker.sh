#!/bin/sh

docker system prune --force
docker build -t stimson-web-curator-backend .  
docker run -d --user seluser -p 5000:5000 -it stimson-web-curator-backend
