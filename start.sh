#!/bin/sh

nohup sh -c cd /home/seluser/api && flask run --no-debugger &
nohup sh -c cd /home/seluser && npm run start &

