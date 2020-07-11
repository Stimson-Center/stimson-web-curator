#! /usr/bin/env sh

echo "Running cusomized inside /app/prestart.sh, you could add migrations to this file, e.g.:"
. /app/.venv/bin/activate
export GOOGLE_APPLICATION_CREDENTIALS=/app/.GOOGLE_APPLICATION_CREDENTIALS.json

