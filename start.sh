#!/usr/bin/env bash

( cd ./backend && ./start.sh &)
( cd ./frontend && ./start.sh )

