#!/bin/sh

nohup sh -c ./backend/api/app.py &
cd ./frontend
npm run start

