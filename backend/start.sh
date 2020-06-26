#!/usr/bin/env bash

cd /usr/app/backend
GOOGLE_APPLICATION_CREDENTIALS=/usr/app/.GOOGLE_APPLICATION_CREDENTIALS.json . /usr/app/.venv/bin/activate && exec python app.py
