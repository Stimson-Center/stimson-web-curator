#!/usr/bin/env bash

gcloud -v
gcloud components update
if [ -d "build" ]; then rm -rf "build"; fi
npm run build
gcloud config set project stimson-web-curator-ui
gcloud app deploy --project=stimson-web-curator-ui --stop-previous-version --promote --verbosity=debug
gcloud app describe --project=stimson-web-curator-ui
gcloud app logs tail -s default

