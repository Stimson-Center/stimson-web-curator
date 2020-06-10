# -*- coding: utf-8 -*-

import json

import pytest


# https://pypi.org/project/pytest-flask/
@pytest.mark.options(debug=True)
def test_search_defaults(client):
    event = {
        "allOfTheseWords": "IUU",
        "anyOfTheseWords": None,
        "exactWordOrPhrase": None,
        "fileType": None,
        "language": "any",
        "noneOfTheseWordsOrPhrases": None,
        "numbersRangingFrom": None,
        "numbersRangingTo": None,
        "country": "any",
        "searchStart": 1,
        "siteOrDomain": None,
        "termsAppearing": None
    }

    response = client.post("/search", json=event)
    assert 200 == response.status_code
    assert '200 OK' == response.status
    assert 'utf-8' == response.charset
    data = json.loads(response.data)
    assert len(data) == 100
