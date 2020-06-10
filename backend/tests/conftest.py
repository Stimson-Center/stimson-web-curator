import logging

import pytest

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


@pytest.fixture
def fixture_directory():
    import os
    return os.path.join(os.path.dirname(__file__), "fixtures")


@pytest.fixture(scope='function')
def app():
    from api.routes import app
    return app
