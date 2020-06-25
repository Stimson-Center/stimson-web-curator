#!/usr/bin/env bash
( cd ./backend && GOOGLE_APPLICATION_CREDENTIALS=/usr/app/.GOOGLE_APPLICATION_CREDENTIALS.json ./start.sh &)
( cd ./frontend && ./start.sh )

