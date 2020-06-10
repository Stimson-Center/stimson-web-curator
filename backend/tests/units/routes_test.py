# -*- coding: utf-8 -*-


def test_hello(flask_app_client):
    client = flask_app_client
    response = client.get("/")
    assert 200 == response.status_code
    assert '200 OK' == response.status
    assert 'utf-8' == response.charset
