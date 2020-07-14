#!/usr/bin/env bash

gcloud -v
gcloud components update
if [ -d "build" ]; then rm -rf "build"; fi
if [ -f ".env" ]; then cp -p .env .env.local; fi
cp -p .env.production .env
npm run build
gcloud config set project stimson-web-curator-ui
# gcloud app deploy --project=stimson-web-curator-ui --stop-previous-version --promote --verbosity=debug
gcloud app deploy --project=stimson-web-curator-ui --promote
cp -p .env.local .env
gcloud app describe --project=stimson-web-curator-ui
gcloud app browse
# gcloud app logs tail -s default

