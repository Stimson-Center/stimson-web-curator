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
import string

# https://preslav.me/2019/01/09/dotenv-files-python/
from dotenv import load_dotenv
from flask import request
from flask_cors import CORS
from flask_restful import Resource, Api
from googleapiclient.discovery import build
# noinspection PyPackageRequirements
from scraper import Article
from scraper import get_available_languages
# noinspection PyPackageRequirements
from scraper.configuration import Configuration
from api import create_app
from .constants import _countries

__title__ = 'stimson-web-curator'
__author__ = 'Alan S. Cooper'
__license__ = 'MIT'
__copyright__ = 'Copyright 2020, The Stimson Center'
__maintainer__ = "The Stimson Center"
__maintainer_email = "cooper@pobox.com"

app = create_app("app")
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
    @staticmethod
    def post():
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
    @staticmethod
    def get():
        return {'hello': 'world'}


# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
# https://stackoverflow.com/questions/13279399/how-to-obtain-values-of-request-variables-using-python-and-flask
class ArticlePool(Resource):
    @staticmethod
    def get():
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

    @staticmethod
    def delete(thread_id):
        global exporting_threads
        exporting_threads.pop(thread_id)
        return {}, 200, {'Content-Type': 'application/json'}


# https://stackoverflow.com/questions/24251898/flask-app-update-progress-bar-while-function-runs
class ArticleProgress(Resource):
    @staticmethod
    def get(thread_id):
        global exporting_threads
        # print("Args=" + json.dumps(request.args))
        # print("Values=" + json.dumps(request.values))
        # print("Form=" + json.dumps(request.form))
        article = exporting_threads[thread_id].article
        if isinstance(article.publish_date, datetime.date):
            publish_date = article.publish_date.strftime("%Y-%m-%d")
        elif isinstance(article.publish_date, str):
            publish_date = article.publish_date
        else:
            publish_date = "2020-05-28"
        result = {
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
        }
        # exporting_threads.pop(thread_id, None)
        # print(json.dumps(result))
        return result, 200, {'Content-Type': 'application/json'}


#  {
#       allOfTheseWords: null,
#       exactWordOrPhrase: null,
#       anyOfTheseWords: null,
#       noneOfTheseWordsOrPhrases: null,
#       numbersRangingFrom: null,
#       numbersRangingTo: null,
#       language: null,
#       region: null,
#       siteOrDomain: null,
#       termsAppearing: null,
#       fileType: null
#  }
# https://developers.google.com/custom-search/docs/element
# https://stackoverflow.com/questions/37083058/programmatically-searching-google-in-python-using-custom-search
class Search(Resource):
    @staticmethod
    def post():
        # Get environment variables
        load_dotenv()
        api_key = os.getenv('GOOGLE_SECRET_API_KEY')
        cse_id = os.getenv('GOOGLE_SECRET_CUSTOM_SEARCH_ID')
        form = request.get_json()

        search_start = form['searchStart'] if 'searchStart' in form else 1
        service = build("customsearch", "v1", developerKey=api_key)
        results = list()
        kwargs = dict()
        if form['language'] != 'any' and len(form['language']) >= 2:
            # https://developers.google.com/custom-search/docs/element
            kwargs['gl'] = form['language']
            kwargs['lr'] = f"lang_{form['language'][0:2]}"
        if form['country'] != 'any' and form['country'].startswith("country") and len(form['country']) == 9:
            # https://developers.google.com/custom-search/docs/element
            kwargs['cr'] = form['country']
        if "sort_by" in form and form['sort_by'] == 'date':
            # sort_by ""  by default is sorted by "relevance"
            kwargs['enableOrderBy'] = True
            kwargs['sort_by'] = form['sort_by']
        if "anyOfTheseWords" in form and form['anyOfTheseWords']:
            kwargs['webSearchQueryAddition'] = form['anyOfTheseWords']
        if "fileType" in form and form['fileType']:
            kwargs['as_filetype'] = form['fileType']
        search_term = form['allOfTheseWords']
        for i in range(1, 11):
            kwargs['start'] = search_start
            result = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()
            if "items" not in result:
                break
            results.extend(result['items'])
            search_start += len(result['items'])
        return results, 200, {'Content-Type': 'application/json'}


class Languages(Resource):
    @staticmethod
    def get():
        return get_available_languages(), 200, {'Content-Type': 'application/json'}


class Countries(Resource):
    @staticmethod
    def get():
        return _countries, 200, {'Content-Type': 'application/json'}


def valid_filename(filename):
    valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
    return ''.join(c for c in filename if c in valid_chars)


class Share(Resource):
    @staticmethod
    def post():
        # https://codelabs.developers.google.com/codelabs/gsuite-apis-intro/#0
        # Get environment variables
        load_dotenv()
        # api_key = os.getenv('GOOGLE_SECRET_API_KEY')
        # cse_id = os.getenv('GOOGLE_SECRET_CUSTOM_SEARCH_ID')
        home = os.getenv('HOME')
        form = request.get_json()
        form.pop('progress', None)
        form.pop('thread_id', None)
        publish_date = form['publish_date'][0:10] if form['publish_date'] else ''
        title = valid_filename(form['title'])
        filename = f"{publish_date} {title}"
        # Save json to file, filename length <=255
        # https://stackoverflow.com/questions/265769/maximum-filename-length-in-ntfs-windows-xp-and-windows-vista#:~:text=14%20Answers&text=Individual%20components%20of%20a%20filename,files%2C%20248%20for%20folders).
        filepath = os.path.join(home, filename[0:230] + ".json")
        # noinspection PyUnusedLocal
        with open(filepath, "w", encoding='utf-8') as f:
            f.write(json.dumps(form, indent=4, sort_keys=True))
        return {"filepath": filepath}, 200, {'Content-Type': 'application/json'}


api.add_resource(HelloWorld, '/')
api.add_resource(ArticlePool, '/article')
api.add_resource(ArticleProgress, '/article/<int:thread_id>')
api.add_resource(Countries, '/countries')
api.add_resource(Languages, '/languages')
api.add_resource(Search, '/search')
api.add_resource(Share, '/share')
