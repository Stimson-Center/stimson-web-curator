#!/usr/bin/env python

"""
https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

Downloads the necessary NLTK models and corpora required to support
all of scraper's features. Modify for your own needs.
"""
import nltk

REQUIRED_CORPORA = [
    'brown',  # Required for FastNPExtractor
    'punkt',  # Required for WordTokenizer
    'maxent_treebank_pos_tagger',  # Required for NLTKTagger
    'movie_reviews',  # Required for NaiveBayesAnalyzer
    'wordnet',  # Required for lemmatization and Wordnet
    'stopwords'
]

import json
import logging

from flask import Flask, request
from scraper import Article
from scraper.configuration import Configuration

from flask import Flask, render_template

app = Flask(__name__)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/hello")
def hello():
    return "Hello World!!!!!!!!!!!!!!!!!!!!!!!"


@app.route('/article', methods=['GET'])
def get_article():
    url = request.args.get('url')
    article = _get_article(url)
    article.build()
    return json.dumps({
        "authors": article.authors,
        "images:": list(article.images),
        "keywords": article.keywords,
        "movies": article.movies,
        "publish_date": article.publish_date.strftime("%s") if article.publish_date else None,
        "summary": article.summary,
        "text": article.text,
        "title": article.title,
        "topimage": article.top_image}), 200, {'Content-Type': 'application/json'}


def _get_article(url):
    config = Configuration()
    pdf_defaults = {
        # "application/pdf": "%PDF-",
        # "application/x-pdf": "%PDF-",
        "application/x-bzpdf": "%PDF-",
        "application/x-gzpdf": "%PDF-"
    }
    article = Article(url, request_timeout=config.request_timeout, ignored_content_types_defaults=pdf_defaults)
    article.download()
    # uncomment this if 200 is desired in case of bad url
    # article.set_html(article.html if article.html else '<html></html>')
    article.parse()
    article.nlp()
    return article


if __name__ == "__main__":
    for each in REQUIRED_CORPORA:
        print(('Downloading "{0}"'.format(each)))
        nltk.download(each)
    print("Finished.")
    app.run(host='0.0.0.0', port=5000, threaded=True)
