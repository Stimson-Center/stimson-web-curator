#!/usr/bin/env bash

gcloud -v
gcloud components install app-engine-python
gcloud components update
gcloud config set project stimson-web-curator-api
gcloud app deploy --project=stimson-web-curator-api --verbosity=debug
gcloud app describe --project=stimson-web-curator-api
gcloud app logs tail -s default

