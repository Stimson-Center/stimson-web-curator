# Docker file for a slim Ubuntu-based Python3 image

FROM python:latest
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

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y tzdata

# Install Node.js
RUN apt -y update
RUN apt -y upgrade

RUN apt-get -y install sudo curl gcc g++ make
RUN curl --silent --location https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt-get -y install nodejs

# Bundle app source
RUN groupadd ubuntu
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g ubuntu -G sudo -u 1001 ubuntu
RUN usermod -aG ubuntu ubuntu
RUN mkdir -p /usr/app
COPY . /usr/app/
RUN chown -R ubuntu:ubuntu /usr/app

# remove for security reasons
RUN apt -y update
RUN apt-get -y purge curl
COPY backend/stimson-web-api /etc/init.d/stimson-web-api
COPY backend/sudoers /etc/sudoers
RUN chmod a+x /etc/init.d/stimson-web-api
RUN chown ubuntu:ubuntu /etc/init.d/stimson-web-api
# RUN (export SUDO_FORCE_REMOVE=yes && apt-get -y purge sudo)


USER ubuntu
RUN mkdir -p /home/ubuntu/.local/bin
RUN mkdir -p /home/ubuntu/.local/lib

COPY .env /usr/app/frontend/.env
COPY .env /usr/app/backend/.env
COPY .GOOGLE_APPLICATION_CREDENTIALS.json /usr/app/.GOOGLE_APPLICATION_CREDENTIALS.json

#USER root
#RUN ln -sf /home/ubuntu/.local/bin/* /usr/local/bin/
## https://dzone.com/articles/run-your-java-application-as-a-service-on-ubuntu
#COPY backend/stimson-web-api /etc/init.d/stimson-web-api
#COPY backend/sudoers /etc/sudoers
#RUN chmod a+x /etc/init.d/stimson-web-api
#RUN chown ubuntu:ubuntu /etc/init.d/stimson-web-api
#RUN update-rc.d stimson-web-api defaults


USER ubuntu
# https://pythonspeed.com/articles/activate-virtualenv-dockerfile/
RUN python -m venv /usr/app/.venv
WORKDIR /usr/app/backend
RUN . /usr/app/.venv/bin/activate && pip install --upgrade pip
RUN . /usr/app/.venv/bin/activate && pip install -r requirements.txt
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download zh_core_web_sm  # Chinese
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download da_core_news_sm # Danish
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download nl_core_news_sm # Dutch
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download en_core_web_sm  # English
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download fr_core_news_sm # French
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download de_core_news_sm # German
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download el_core_news_sm # Greek
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download it_core_news_sm # Italian
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download ja_core_news_sm # Japanese
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download lt_core_news_sm # Lithuanian
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download xx_ent_wiki_sm  # Multi-language
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download nb_core_news_sm # Norwegian Bokmål
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download pl_core_news_sm # Polish
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download pt_core_news_sm # Portuguese
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download ro_core_news_sm # Romanian
RUN . /usr/app/.venv/bin/activate && exec python -m spacy download es_core_news_sm # Spanish

WORKDIR /usr/app/frontend
RUN npm install

WORKDIR /usr/app
#RUN service stimson-web-api start
EXPOSE 3000 5000
#RUN ls -la /usr/app

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["bash", "-c", "./start.sh"]

