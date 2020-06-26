#!/usr/bin/env bash

# sudo su - ubuntu service stimson-web-api restart
( cd ./backend && ./start.sh & )
( cd ./frontend && ./start.sh )
