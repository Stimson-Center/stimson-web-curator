#!/usr/bin/env python3

# app.py - a minimal flask api using flask_restful
# https://medium.com/@doedotdev/docker-flask-a-simple-tutorial-bbcb2f4110b5
# https://github.com/flask-restful/flask-restful/blob/master/examples/todo.py

import datetime
import json
import logging
import os
import random
import threading

import nltk
import requests
# https://preslav.me/2019/01/09/dotenv-files-python/
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Resource, Api
from scraper import Article
from scraper.configuration import Configuration

__title__ = 'stimson-web-curator'
__author__ = 'Alan S. Cooper'
__license__ = 'MIT'
__copyright__ = 'Copyright 2020, The Stimson Center'
__maintainer__ = "The Stimson Center"
__maintainer_email = "cooper@pobox.com"

app = Flask(__name__)
api = Api(app)
port = 5000
# https://github.com/corydolphin/flask-cors/issues/201
cors = CORS(app,
            resources={r"/*": {"origins": "*"}},
            origins=f"http://127.0.0.1:{port}",
            allow_headers=[
                "Content-Type", "Authorization",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"],
            supports_credentials=True
            )
exporting_threads = {}
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


@app.before_request
def authorize_token():
    pass
    # if request.endpoint != 'token':
    #     try:
    #         auth_header = request.headers.get("Authorization")
    #         if "Bearer" in auth_header:
    #             token = auth_header.split(' ')[1]
    #             if token != '12345678':
    #                 raise ValueError('Authorization failed.')
    #     except Exception as e:
    #         return "401 Unauthorized\n{}\n\n".format(e), 401


class GetToken(Resource):
    def post(self):
        token = '12345678'
        return token  # token sent to client to return in subsequent
        # requests in Authorization header


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


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
# https://stackoverflow.com/questions/13279399/how-to-obtain-values-of-request-variables-using-python-and-flask
class ArticlePool(Resource):
    def get(self):
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
class ArticleProgress(Resource):
    def get(self, thread_id):
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


class Search(Resource):
    def get(self):
        # print("Args=" + json.dumps(request.args))
        # print("Values=" + json.dumps(request.values))
        # print("Form=" + json.dumps(request.form))

        # Get environment variables
        load_dotenv()
        api_key = os.getenv('GOOGLE_SECRET_API_KEY')
        cse_id = os.getenv('GOOGLE_SECRET_CUSTOM_SEARCH_ID')
        # Get search request param and log it
        search_string = request.args.get('searchString', '')
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
            api_response = {"search_string": search_string, "search_result_message": search_result_message,
                            "num_results": 0, "page_size": page_size}
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


api.add_resource(HelloWorld, '/')
api.add_resource(ArticlePool, '/article')
api.add_resource(ArticleProgress, '/article/<int:thread_id>')
api.add_resource(Search, '/search')

if __name__ == '__main__':
    from waitress import serve

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
    # app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
    serve(app, host="0.0.0.0", port=port, threads=100)
