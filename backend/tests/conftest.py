import logging

import psycopg2
import pytest


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


@pytest.fixture
def fixture_directory():
    import os
    return os.path.join(os.path.dirname(__file__), "fixtures")

@pytest.fixture(scope='function')
def flask_app_client():
    from api import create_app
    app = create_app('test')
    app_context = app.app_context()
    app_context.push()
    app.testing = True
    app.config['WTF_CSRF_ENABLED'] = False
    client = app.test_client(use_cookies=True)
    return client
