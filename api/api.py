#!/usr/bin/env python

"""
https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

Downloads the necessary NLTK models and corpora required to support
all of scraper's features. Modify for your own needs.
"""
import nltk
import random
import threading
import time
import json
import logging

from flask import Flask, request, render_template
from scraper import Article
from scraper.configuration import Configuration

exporting_threads = {}
app = Flask(__name__)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

class ExportingThread(threading.Thread):
    def __init__(self, url):
        self.progress = 0
        config = Configuration()
        pdf_defaults = {
            # "application/pdf": "%PDF-",
            # "application/x-pdf": "%PDF-",
            "application/x-bzpdf": "%PDF-",
            "application/x-gzpdf": "%PDF-"
        }
        self.article = Article(url, request_timeout=config.request_timeout, ignored_content_types_defaults=pdf_defaults)
        super().__init__()

    def run(self):
        # Your exporting stuff goes here ...
        self.progress = 20
        self.article.download()
        self.progress = 40
        # uncomment this if 200 is desired in case of bad url
        # self.article.set_html(article.html if article.html else '<html></html>')
        self.article.parse()
        self.progress = 60
        self.article.nlp()
        self.progress = 100



@app.route('/article', methods=['GET'])
def index():
    global exporting_threads
    url = request.args.get('url')

    thread_id = random.randint(0, 10000)
    exporting_threads[thread_id] = ExportingThread(url)
    exporting_threads[thread_id].start()

    return 'task id: #%s' % thread_id

# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
@app.route('/article/<int:thread_id>', methods=['GET'])
def get_article(thread_id):
    global exporting_threads
    article = exporting_threads[thread_id].article
    result = json.dumps({
        "authors": article.authors,
        "images:": list(article.images),
        "keywords": article.keywords,
        "movies": article.movies,
        "progress": exporting_threads[thread_id].progress,
        "publish_date": article.publish_date.strftime("%s") if article.publish_date else None,
        "summary": article.summary,
        "text": article.text,
        "title": article.title,
        "topimage": article.top_image,
        "url": article.url
        }), 200, {'Content-Type': 'application/json'}
    exporting_threads.pop(thread_id, None)
    return result


# @app.route("/")
# def index():
#     return render_template("index.html")


@app.route("/hello")
def hello():
    return "Hello World!!!!!!!!!!!!!!!!!!!!!!!"

if __name__ == "__main__":
    REQUIRED_CORPORA = [
        'brown',  # Required for FastNPExtractor
        'punkt',  # Required for WordTokenizer
        'maxent_treebank_pos_tagger',  # Required for NLTKTagger
        'movie_reviews',  # Required for NaiveBayesAnalyzer
        'wordnet',  # Required for lemmatization and Wordnet
        'stopwords'
    ]
    for each in REQUIRED_CORPORA:
        print(('Downloading "{0}"'.format(each)))
        nltk.download(each)
    print("Finished.")
    app.run(host='0.0.0.0', port=5000, threaded=True)
