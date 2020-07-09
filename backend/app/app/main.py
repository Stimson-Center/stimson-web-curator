#!/usr/bin/env python3
# main.py - a minimal flask api using flask_restful
# https://medium.com/@doedotdev/docker-flask-a-simple-tutorial-bbcb2f4110b5
# https://github.com/flask-restful/flask-restful/blob/master/examples/todo.py

import logging

from flask_restful import Api

from flask import Flask
from .api.endpoints import create_routes

Logger = None


def create_app(name):
    global Logger

    app = Flask(name)
    app.logger.setLevel(logging.DEBUG)
    Logger = app.logger
    return app


app = create_app("app")
api = Api(app)
create_routes(api)

__title__ = 'stimson-web-curator'
__author__ = 'Alan S. Cooper'
__license__ = 'MIT'
__copyright__ = 'Copyright 2020, The Stimson Center'
__maintainer__ = "The Stimson Center"
__maintainer_email = "cooper@pobox.com"

if __name__ == "__main__":
    # Only for debugging while developing
    app.logger.info("IN MAIN")
    app.run(host="0.0.0.0", debug=True, port=80)
