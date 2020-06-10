#!/bin/sh

nohup sh -c ./backend/app.py &
cd ./frontend
npm run start

