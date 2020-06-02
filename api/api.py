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
import datetime
import requests
import os


from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin

from bs4 import BeautifulSoup
# https://preslav.me/2019/01/09/dotenv-files-python/
from dotenv import load_dotenv
from googleapiclient.discovery import build  # Import the library

from scraper import Article
from scraper.configuration import Configuration


__title__ = 'stimson-web-curator'
__author__ = 'Alan S. Cooper'
__license__ = 'MIT'
__copyright__ = 'Copyright 2020, The Stimson Center'
__maintainer__ = "The Stimson Center"
__maintainer_email = "cooper@pobox.com"

exporting_threads = {}
app = Flask(__name__)
cors = CORS(app, resources={r"/article": {"origins": "http://localhost:port"}})

app.config['CORS_HEADERS'] = 'Content-Type'

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



# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
# https://stackoverflow.com/questions/13279399/how-to-obtain-values-of-request-variables-using-python-and-flask
@app.route('/article', methods=['GET', 'OPTIONS'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization','Access-Control-Allow-Origin'])
def get_article():
    global exporting_threads
    # print("Args=" + json.dumps(request.args))
    # print("Values=" + json.dumps(request.values))
    # print("Form=" + json.dumps(request.form))
    url = request.args.get('url')

    thread_id = random.randint(0, 10000)
    exporting_threads[thread_id] = ExportingThread(url)
    exporting_threads[thread_id].start()
    result = {"thread_id": thread_id}
    return result, 200, {'Content-Type': 'application/json'}


# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
@app.route('/article/<int:thread_id>', methods=['GET','OPTIONS'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization','Access-Control-Allow-Origin'])
def get_article_progress(thread_id):
    global exporting_threads
    article = exporting_threads[thread_id].article
    if isinstance(article.publish_date, datetime.date):
        publish_date = article.publish_date.strftime("%Y-%m-%d")
    elif isinstance(article.publish_date, str):
        publish_date = article.publish_date
    else:
        publish_date = "2020-05-28"
    result = json.dumps({
        "authors": article.authors,
        "images:": list(article.images),
        "keywords": article.keywords,
        "movies": article.movies,
        "progress": exporting_threads[thread_id].progress,
        "publish_date": publish_date,
        "summary": article.summary,
        "text": article.text,
        "title": article.title,
        "topimage": article.top_image,
        "url": article.url,
        "tables": article.tables
        })
    # exporting_threads.pop(thread_id, None)
    return result, 200, {'Content-Type': 'application/json'}


# https://github.com/gregdferrell/google-custom-search-json-demo
@app.route('/search', methods=['GET', 'OPTIONS'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization','Access-Control-Allow-Origin'])
def google_search():
    # print("Args=" + json.dumps(request.args))
    # print("Values=" + json.dumps(request.values))
    # print("Form=" + json.dumps(request.form))

    # Get environment variables
    load_dotenv()
    api_key = os.getenv('GOOGLE_SECRET_API_KEY')
    cse_id = os.getenv('GOOGLE_SECRET_CUSTOM_SEARCH_ID')
    # Get search request param and log it
    search_string = request.args.get('searchString', 'Illegal Unregulated Unrestricted Fishing')
    search_start = request.args.get('searchStart', '1')
    page_size = 10
    print('search string: ' + search_string)
    print('search start: ' + search_start)

    if search_string == '':
        api_response = {"search_string": '', "search_result_message": '', "num_results": 0, "page_size": page_size}
        return api_response, 401, {'Content-Type': 'application/json'}

    # https://www.pingshiuanchua.com/blog/post/scraping-search-results-from-google-search
    # https://towardsdatascience.com/current-google-search-packages-using-python-3-7-a-simple-tutorial-3606e459e0d4
    # Construct URL and call API
    url = 'https://www.googleapis.com/customsearch/v1?q={}&start={}&cx={}&key={}'.format(
        search_string, search_start, cse_id, api_key)
    response = requests.get(url)

    if response.status_code != 200:
        search_result_message = 'Search returned an error: {} {}'.format(
            response.status_code, response.reason)
        api_response = {"search_string": search_string, "search_result_message": search_result_message, "num_results": 0, "page_size": page_size}
        return api_response, response.status_code, {'Content-Type': 'application/json'}

    # Render search results
    data = response.json()
    num_results = int(data.get('searchInformation').get('totalResults'))
    search_time = data.get('searchInformation').get('formattedSearchTime')
    results = data.get('items')
    search_result_message = 'No results found ({} seconds)'.format(
        search_time) if num_results == 0 else 'About {} results ({} seconds)'.format(
        num_results, search_time)

    api_response = {
        "search_string": search_string,
        "search_result_message": search_result_message,
        "num_results": num_results,
        "search_start": search_start,
        "search_time": search_time,
        "results": results,
        "page_size": page_size
    }
    return api_response, 200, {'Content-Type': 'application/json'}


@app.route("/")
def index():
    return render_template("index.html")


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
