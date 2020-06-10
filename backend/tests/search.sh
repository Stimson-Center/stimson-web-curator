#!/usr/bin/env bash

curl -H "Content-Type: application/json" -X POST -d '{"allOfTheseWords": "IUU", "anyOfTheseWords": null, "exactWordOrPhrase": null, "fileType": null, "language": "any", "noneOfTheseWordsOrPhrases": null, "numbersRangingFrom": null, "numbersRangingTo": null, "country": "any", "searchStart": 1, "siteOrDomain": null, "termsAppearing": null}' http://localhost:5000/search
