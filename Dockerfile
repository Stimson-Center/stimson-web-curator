# Docker file for a slim Ubuntu-based Python3 image

FROM python:latest
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update

# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

RUN pip3 --no-cache-dir install --upgrade pip setuptools
RUN apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y tzdata

RUN pip3 --no-cache-dir install virtualenv

# Install Node.js
RUN apt -y update
RUN apt -y upgrade

RUN apt-get -y install sudo curl
RUN curl --silent --location https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt-get -y install nodejs

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832

RUN groupadd ubuntu
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g ubuntu -G sudo -u 1001 ubuntu
RUN usermod -aG ubuntu ubuntu
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . /usr/app
RUN chown -R ubuntu:ubuntu /usr/app
RUN ln -sf /home/ubuntu/.local/bin/flask /usr/local/bin/flask

# remove for security reasons
RUN apt-get -y remove sudo curl

USER ubuntu
RUN mkdir -p /home/ubuntu/.local/bin
RUN mkdir -p /home/ubuntu/.local/lib
# RUN virtualenv venv
# RUN source venv/bin/activate
COPY .GOOGLE_APPLICATION_CREDENTIALS.json .
RUN export GOOGLE_APPLICATION_CREDENTIALS=/usr/app/.GOOGLE_APPLICATION_CREDENTIALS.json

WORKDIR /usr/app/backend
RUN pip3 install -r requirements.txt
RUN python3 -m spacy download zh_core_web_sm  # Chinese
RUN python3 -m spacy download da_core_news_sm # Danish
RUN python3 -m spacy download nl_core_news_sm # Dutch
RUN python3 -m spacy download en_core_web_sm  # English
RUN python3 -m spacy download fr_core_news_sm # French
RUN python3 -m spacy download de_core_news_sm # German
RUN python3 -m spacy download el_core_news_sm # Greek
RUN python3 -m spacy download it_core_news_sm # Italian
RUN python3 -m spacy download ja_core_news_sm # Japanese
RUN python3 -m spacy download lt_core_news_sm # Lithuanian
RUN python3 -m spacy download xx_ent_wiki_sm  # Multi-language
RUN python3 -m spacy download nb_core_news_sm # Norwegian Bokmål
RUN python3 -m spacy download pl_core_news_sm # Polish
RUN python3 -m spacy download pt_core_news_sm # Portuguese
RUN python3 -m spacy download ro_core_news_sm # Romanian
RUN python3 -m spacy download es_core_news_sm # Spanish

WORKDIR /usr/app/

EXPOSE 3000 5000

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["sh", "-c", "/usr/app/start.sh"]

