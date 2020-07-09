FROM tiangolo/uwsgi-nginx-flask:python3.8
# https://hub.docker.com/r/tiangolo/uwsgi-nginx-flask/
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update

# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

RUN pip --no-cache-dir install --upgrade pip setuptools
RUN apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev systemd

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

COPY .env /app/.env
COPY .GOOGLE_APPLICATION_CREDENTIALS.json /app/.GOOGLE_APPLICATION_CREDENTIALS.json
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/.GOOGLE_APPLICATION_CREDENTIALS.json
COPY requirements.txt /app/requirements.txt
COPY ./app /app

# https://pythonspeed.com/articles/activate-virtualenv-dockerfile/
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install --upgrade certifi
RUN python -m spacy download zh_core_web_sm  # Chinese
RUN python -m spacy download da_core_news_sm # Danish
RUN python -m spacy download nl_core_news_sm # Dutch
RUN python -m spacy download en_core_web_sm  # English
RUN python -m spacy download fr_core_news_sm # French
RUN python -m spacy download de_core_news_sm # German
RUN python -m spacy download el_core_news_sm # Greek
RUN python -m spacy download it_core_news_sm # Italian
# RUN python -m spacy download ja_core_news_sm # Japanese
RUN python -m spacy download lt_core_news_sm # Lithuanian
RUN python -m spacy download xx_ent_wiki_sm  # Multi-language
RUN python -m spacy download nb_core_news_sm # Norwegian Bokmål
RUN python -m spacy download pl_core_news_sm # Polish
RUN python -m spacy download pt_core_news_sm # Portuguese
RUN python -m spacy download ro_core_news_sm # Romanian
RUN python -m spacy download es_core_news_sm # Spanish