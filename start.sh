#!/bin/sh

( cd ./backend && python3 app.py &)
( cd ./frontend && npm run start )

