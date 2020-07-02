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
from scraper import Sources as Srcs
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
    def __init__(self, url, language='en', translate=False):
        self.progress = 0
        config = Configuration()
        config.follow_meta_refresh = True
        config.use_meta_language = False
        config.set_language(language)
        if isinstance(translate, str):
            translate = translate.lower() == 'true'
        config.translate = translate
        config.http_success_only = False
        config.ignored_content_types_defaults = {
            # "application/pdf": "%PDF-",
            # "application/x-pdf": "%PDF-",
            "application/x-bzpdf": "%PDF-",
            "application/x-gzpdf": "%PDF-"
        }
        # print(f"translate={translate}")
        self.article = Article(url, config=config)
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
        language = request.args.get('language')
        language = language[:2]
        translate = request.args.get('translate')

        thread_id = random.randint(0, 10000)
        exporting_threads[thread_id] = ExportingThread(url, language=language, translate=translate)
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
        response = {
            "authors": article.authors,
            "images:": list(article.images),
            "keywords": article.keywords,
            "movies": article.movies,
            "progress": exporting_threads[thread_id].progress,
            "publish_date": article.publish_date,
            "summary": article.summary,
            "text": article.text,
            "title": article.title,
            "topimage": article.top_image,
            "url": article.url,
            "tables": article.tables,
            "language": article.meta_lang,
            "html": article.html
        }
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


class Sources(Resource):
    @staticmethod
    def post():
        form = request.get_json()
        sources = Srcs(form['url'], language=form['language'])
        response = {"articles": sources.get_articles(), "categories": sources.get_categories()}
        return response, 200, {'Content-Type': 'application/json'}


# =====================================================================================================================
# https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
# https://github.com/caiogranero/google-custom-search-api-python
# I.O.U. caiogranero $10.00 since the Google documentation is not correct and your's is correct!
# Args:
#   q: string, Query (required)
#   c2coff: string, Turns off the translation between zh-CN and zh-TW.
#   cr: string, Country restrict(s).
#   cref: string, The URL of a linked custom search engine
#   cx: string, The custom search engine ID to scope this search query
#   dateRestrict: string, Specifies all search results are from a time period
#   exactTerms: string, Identifies a phrase that all documents in the search results must contain
#   excludeTerms: string, Identifies a word or phrase that should not appear in any documents in the search results
#   fileType: string, Returns images of a specified type. Some of the allowed values are: bmp, gif, png, jpg, svg, pdf, ...
#   filter: string, Controls turning on or off the duplicate content filter.
#     Allowed values
#       0 - Turns off duplicate content filter.
#       1 - Turns on duplicate content filter.
#   gl: string, Geolocation of end user.
#   googlehost: string, The local Google domain to use to perform the search.
#   highRange: string, Creates a range in form as_nlo value..as_nhi value and attempts to append it to query
#   hl: string, Sets the user interface language.
#   hq: string, Appends the extra query terms to the query.
#   linkSite: string, Specifies that all search results should contain a link to a particular URL
#   lowRange: string, Creates a range in form as_nlo value..as_nhi value and attempts to append it to query
#   lr: string, The language restriction for the search results
#     Allowed values
#       lang_ar - Arabic
#   orTerms: string, Provides additional search terms to check for in a document, where each document in the search results must contain at least one of the additional search terms
#   num: integer, Number of search results to return
#   relatedSite: string, Specifies that all search results should be pages that are related to the specified URL
#   rights: string, Filters based on licensing. Supported values include: cc_publicdomain, cc_attribute, cc_sharealike, cc_noncommercial, cc_nonderived and combinations of these.
#   safe: string, Search safety level
#     Allowed values
#       high - Enables highest level of safe search filtering.
#       medium - Enables moderate safe search filtering.
#       off - Disables safe search filtering.
#   siteSearch: string, Specifies all search results should be pages from a given site
#   siteSearchFilter: string, Controls whether to include or exclude results from the site named in the as_sitesearch parameter
#     Allowed values
#       e - exclude
#       i - include
#   sort: string, The sort expression to apply to the results
#   start: integer, The index of the first result to return
# =====================================================================================================================
#  {
#       allOfTheseWords: null,
#       orTerms: null,
#       country: "any",
#       fileType: "any",
#       exactTerms: null,
#       language: "any",
#       excludeTerms: null,
#       lowRange: null,
#       highRange: null,
#       siteSearch: null,
#       sort: "relevance" // blank
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
        kwargs['q'] = form['allOfTheseWords']  # must be here
        if "orTerms" in form and form['orTerms']:
            # Provides additional search terms to check for in a document, where each document in
            # the search results must contain at least one of the additional search terms.
            kwargs['orTerms'] = form['orTerms']
        if form['country'] and form['country'].lower() != 'any':
            # https://developers.google.com/custom-search/docs/element
            # Restricts search results to documents originating in a particular country.
            # You may use Boolean operators in the cr parameter's value.
            kwargs['cr'] = countries[form['country']]
        if "exactTerms" in form and form['exactTerms']:
            # Identifies a phrase that all documents in the search results must contain
            kwargs['exactTerms'] = form['exactTerms']
        if form["fileType"] and form['fileType'].lower() != 'any':
            # Restricts results to files of a specified extension. A list of
            # file types indexable by Google can be found in Search Console
            kwargs['fileType'] = file_types[form['fileType']]
        if form['language'] and form['language'].lower() != 'any':
            # https://developers.google.com/custom-search/docs/element
            language_code = languages[form['language']]
            # The local Google domain (for example, google.com, google.de, or google.fr) to use to perform the search
            kwargs['gl'] = language_code
            # Restricts the search to documents written in a particular language
            kwargs['lr'] = f"lang_{language_code}"
        if "excludeTerms" in form and form['excludeTerms']:
            # Identifies a word or phrase that should not appear in any documents in the search results.
            kwargs['excludeTerms'] = form['excludeTerms']
        if "lowRange" in form \
                and form['lowRange'] \
                and form['lowRange'].lower() != "any" \
                and "highRange" in form \
                and form['highRange'] \
                and form['highRange'].lower() != "any":
            # Use lowRange and highRange to append an inclusive search range of lowRange...highRange to the query.
            kwargs['lowRange'] = form['lowRange']
            kwargs['highRange'] = form['highRange']
        if "siteSearch" in form and form['siteSearch']:
            # Specifies a given site which should always be included or excluded from results
            # (see siteSearchFilter parameter, below)
            kwargs['siteSearch'] = form['siteSearch']
        if form['sort'] and form['sort'] == 'date':
            # In Google, sort_by ""  by default is sorted by "relevance"
            kwargs['sort'] = form['sort']

        # print(json.dumps(kwargs))
        service = build("customsearch", "v1", developerKey=api_key)
        response = list()
        start = form['start'] if 'start' in form else 1
        page_limit = 10
        for page in range(0, page_limit):
            result = service.cse().list(
                cx=cse_id,
                start=start,
                **kwargs
            ).execute()
            if 'items' in result and len(result['items']):
                for item in result['items']:
                    if 'displayLink' in item and item['displayLink'] \
                            and 'snippet' in item and item['snippet'] \
                            and 'link' in item and item['link']:
                        response.append(item)
                        start += 1
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
api.add_resource(Sources, '/sources')
