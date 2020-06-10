import logging

from flask import Flask

Logger = None


def create_app(name):
    global Logger

    app = Flask(name)
    app.logger.setLevel(logging.DEBUG)
    Logger = app.logger
    return app
