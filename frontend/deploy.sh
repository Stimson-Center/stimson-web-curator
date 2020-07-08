#!/usr/bin/env bash

gcloud -v
gcloud components update
if [ -d "build" ]; then rm -rf "build"; fi
npm run build
gcloud app deploy --project=stimson-web-curator-ui  --verbosity=debug
gcloud app describe --project=stimson-web-curator-ui
gcloud app logs tail -s stimson-web-curator-ui

