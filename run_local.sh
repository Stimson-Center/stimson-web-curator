#!/usr/bin/env bash
set -e

if [ -d "build" ]; then rm -rf "build"; fi
if [ -f ".env" ]; then cp -p .env .env.local; fi
cp -p .env.production .env
npm run build
npm run start
