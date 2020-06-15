# -*- coding: utf-8 -*-

import json

import pytest


# https://pypi.org/project/pytest-flask/
@pytest.mark.options(debug=True)
def test_sources(client):
    payload = {"url": "https://opendevelopmentcambodia.net/profiles/special-economic-zones", "language": "en"}
    # https://stackoverflow.com/questions/28054858/flask-test-client-removes-query-string-parameters
    # response = client.get("/sources", query_string=payload)
    # https://stackoverflow.com/questions/54945713/flask-test-client-post-and-json-encoding
    response = client.post("/sources", json=payload)
    assert 200 == response.status_code
    assert '200 OK' == response.status
    assert 'utf-8' == response.charset
    data = json.loads(response.data)
    assert data
    assert len(data['articles'])
    assert len(data['categories'])
