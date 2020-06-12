#!/usr/bin/env python3

# app.py - a minimal flask api using flask_restful
# https://medium.com/@doedotdev/docker-flask-a-simple-tutorial-bbcb2f4110b5
# https://github.com/flask-restful/flask-restful/blob/master/examples/todo.py

import datetime
import json
import logging
import os
import random
import string
import threading

# https://preslav.me/2019/01/09/dotenv-files-python/
from dotenv import load_dotenv
from flask import request
from flask_cors import CORS
from flask_restful import Resource, Api
from googleapiclient.discovery import build
# noinspection PyPackageRequirements
from scraper import Article
# noinspection PyPackageRequirements
from scraper.configuration import Configuration

from api import create_app
from .constants import countries, languages, file_types

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
        response = {
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
        return response, 200, {'Content-Type': 'application/json'}


class Languages(Resource):
    @staticmethod
    def get():
        return languages, 200, {'Content-Type': 'application/json'}


class Countries(Resource):
    @staticmethod
    def get():
        return countries, 200, {'Content-Type': 'application/json'}


class FileTypes(Resource):
    @staticmethod
    def get():
        return file_types, 200, {'Content-Type': 'application/json'}


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


# =====================================================================================================================
# https://github.com/caiogranero/google-custom-search-api-python
# I.O.U. caiogranero $10.00 since the Google documentation is not correct and your's is correct!
# Args:
#   q: string, Query (required)
#   dateRestrict: string, Specifies all search results are from a time period
#   hl: string, Sets the user interface language.
#   orTerms: string, Provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms
#   highRange: string, Creates a range in form as_nlo value..as_nhi value and attempts to append it to query
#   num: integer, Number of search results to return
#   cr: string, Country restrict(s).
#   relatedSite: string, Specifies that all search results should be pages that are related to the specified URL
#   filter: string, Controls turning on or off the duplicate content filter.
#     Allowed values
#       0 - Turns off duplicate content filter.
#       1 - Turns on duplicate content filter.
#   gl: string, Geolocation of end user.
#   fileType: string, Returns images of a specified type. Some of the allowed values are: bmp, gif, png, jpg, svg, pdf, ...
#   start: integer, The index of the first result to return
#   lr: string, The language restriction for the search results
#     Allowed values
#       lang_ar - Arabic
#   siteSearch: string, Specifies all search results should be pages from a given site
#   cref: string, The URL of a linked custom search engine
#   sort: string, The sort expression to apply to the results
#   hq: string, Appends the extra query terms to the query.
#   c2coff: string, Turns off the translation between zh-CN and zh-TW.
#   googlehost: string, The local Google domain to use to perform the search.
#   safe: string, Search safety level
#     Allowed values
#       high - Enables highest level of safe search filtering.
#       medium - Enables moderate safe search filtering.
#       off - Disables safe search filtering.
#   exactTerms: string, Identifies a phrase that all documents in the search results must contain
#   lowRange: string, Creates a range in form as_nlo value..as_nhi value and attempts to append it to query
#   rights: string, Filters based on licensing. Supported values include: cc_publicdomain, cc_attribute, cc_sharealike, cc_noncommercial, cc_nonderived and combinations of these.
#   excludeTerms: string, Identifies a word or phrase that should not appear in any documents in the search results
#   linkSite: string, Specifies that all search results should contain a link to a particular URL
#   cx: string, The custom search engine ID to scope this search query
#   siteSearchFilter: string, Controls whether to include or exclude results from the site named in the as_sitesearch parameter
#     Allowed values
#       e - exclude
#       i - include
# =====================================================================================================================
#  {
#       allOfTheseWords: null,
#       anyOfTheseWords: null,
#       country: "any",
#       fileType: "any",
#       exactWordOrPhrase: null,
#       language: "any",
#       noneOfTheseWordsOrPhrases: null,
#       numbersRangingFrom: null,
#       numbersRangingTo: null,
#       siteOrDomain: null,
#       sortBy: "relevance" // blank
#       means
#       sort # by relevance
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
        kwargs = dict()
        kwargs['filter'] = 1  # Turns on duplicate content filter
        kwargs['safe'] = 'high'  # Enables highest level of safe search filtering
        search_term = form['allOfTheseWords']
        if "anyOfTheseWords" in form and form['anyOfTheseWords']:
            kwargs['orTerms'] = form['anyOfTheseWords']
        if form['country'] and form['country'] != 'any':
            # https://developers.google.com/custom-search/docs/element
            country_code = countries[form['country']]
            kwargs['cr'] = country_code
        if "exactWordOrPhrase" in form and form['exactWordOrPhrase']:
            kwargs['exactTerms'] = form['exactWordOrPhrase']
        if form["fileType"] and form['fileType'] != 'any':
            file_type_code = file_types[form['fileType']]
            kwargs['fileType'] = file_type_code
        if form['language'] and form['language'] != 'any':
            # https://developers.google.com/custom-search/docs/element
            language_code = languages[form['language']]
            kwargs['gl'] = language_code
            kwargs['lr'] = f"lang_{language_code}"
        if "noneOfTheseWordsOrPhrases" in form and form['noneOfTheseWordsOrPhrases']:
            kwargs['excludeTerms'] = form['noneOfTheseWordsOrPhrases']
        if "siteOrDomain" in form and form['siteOrDomain']:
            kwargs['siteSearch'] = form['siteOrDomain']
        if form['sortBy'] and form['sortBy'] == 'date':
            # In Google, sort_by ""  by default is sorted by "relevance"
            kwargs['sort'] = form['sortBy']

        service = build("customsearch", "v1", developerKey=api_key)
        response = list()
        search_start = form['searchStart'] if 'searchStart' in form else 1
        page_limit = 10
        for page in range(0, page_limit):
            result = service.cse().list(
                q=search_term,
                cx=cse_id,
                start=search_start,
                **kwargs
            ).execute()
            if 'items' in result and len(result['items']):
                response.extend(result['items'])
                search_start += len(result['items'])
            else:
                break
        return response, 200, {'Content-Type': 'application/json'}


api.add_resource(HelloWorld, '/')
api.add_resource(ArticlePool, '/article')
api.add_resource(ArticleProgress, '/article/<int:thread_id>')
api.add_resource(Countries, '/countries')
api.add_resource(FileTypes, '/filetypes')
api.add_resource(Languages, '/languages')
api.add_resource(Search, '/search')
api.add_resource(Share, '/share')
