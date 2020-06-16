#!/usr/bin/env python3

# app.py - a minimal flask api using flask_restful
# https://medium.com/@doedotdev/docker-flask-a-simple-tutorial-bbcb2f4110b5
# https://github.com/flask-restful/flask-restful/blob/master/examples/todo.py

import os

from api.routes import app

__title__ = 'stimson-web-curator'
__author__ = 'Alan S. Cooper'
__license__ = 'MIT'
__copyright__ = 'Copyright 2020, The Stimson Center'
__maintainer__ = "The Stimson Center"
__maintainer_email = "cooper@pobox.com"

port = 5000

REQUIRED_CORPORA = [
    'brown',  # Required for FastNPExtractor
    'punkt',  # Required for WordTokenizer
    'maxent_treebank_pos_tagger',  # Required for NLTKTagger
    'movie_reviews',  # Required for NaiveBayesAnalyzer
    'wordnet',  # Required for lemmatization and Wordnet
    'stopwords'
]

if __name__ == '__main__':
    from waitress import serve
    import nltk

    for each in REQUIRED_CORPORA:
        print(('Downloading "{0}"'.format(each)))
        nltk.download(each)
    print("Finished.")

    host = os.environ.get('IP', '0.0.0.0')
    port = int(os.environ.get('PORT', port))
    if os.getenv('FLASK_ENV') == 'development':
        app.run(debug=True, host=host, port=port, threaded=True)
    else:
        serve(app, host=host, port=port, threads=100)
