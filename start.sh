#!/usr/bin/env bash

sudo service stimson-web-api start
( cd ./frontend && ./start.sh )
