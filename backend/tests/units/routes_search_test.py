# -*- coding: utf-8 -*-

import json

import pytest


def common(response):
    assert 200 == response.status_code
    assert '200 OK' == response.status
    assert 'utf-8' == response.charset
    data = json.loads(response.data)
    return data


# https://pypi.org/project/pytest-flask/
@pytest.mark.options(debug=True)
def test_search_defaults(client):
    payload = {
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
        "termsAppearing": None,
        "sortBy": ""
    }

    response = client.post("/search", json=payload)
    data = common(response)
    assert len(data) == 100



# https://pypi.org/project/pytest-flask/
@pytest.mark.options(debug=True)
def test_search_thai(client):
    payload = {
        "allOfTheseWords": "IUU",
        "anyOfTheseWords": None,
        "exactWordOrPhrase": None,
        "fileType": None,
        "language": "Thai",
        "noneOfTheseWordsOrPhrases": None,
        "numbersRangingFrom": None,
        "numbersRangingTo": None,
        "country": "Thailand",
        "searchStart": 1,
        "siteOrDomain": None,
        "termsAppearing": None,
        "sortBy": ""
    }

    response = client.post("/search", json=payload)
    data = common(response)
    assert len(data) > 10 # returned 71 results on 2020/06/10!


