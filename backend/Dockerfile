FROM tiangolo/uwsgi-nginx-flask:python3.8

RUN mkhomedir_helper nginx

RUN apt-get -y update && \
    apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev systemd pipenv python3-venv uwsgi-plugin-python3

COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /app
COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

COPY .env /app/.env
COPY .GOOGLE_APPLICATION_CREDENTIALS.json /app/.GOOGLE_APPLICATION_CREDENTIALS.json
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/.GOOGLE_APPLICATION_CREDENTIALS.json
COPY requirements.txt /app/requirements.txt
COPY prestart.sh /app/prestart.sh
COPY ./app /app

## add permissions for nginx user
RUN chown -R nginx:nginx /app && \
    chmod -R 755 /app && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/log/supervisor && \
    chown -R nginx:nginx /var/run && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown nginx:nginx /etc/nginx/nginx.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

WORKDIR /app
USER nginx

RUN  pip install --upgrade pip
RUN  pip install -r requirements.txt
RUN  python -m spacy download zh_core_web_sm  # Chinese
RUN  python -m spacy download da_core_news_sm # Danish
RUN  python -m spacy download nl_core_news_sm # Dutch
RUN  python -m spacy download en_core_web_sm  # English
RUN  python -m spacy download fr_core_news_sm # French
RUN  python -m spacy download de_core_news_sm # German
RUN  python -m spacy download el_core_news_sm # Greek
RUN  python -m spacy download ja_core_news_sm # Japanese
RUN  python -m spacy download it_core_news_sm # Italian
RUN  python -m spacy download lt_core_news_sm # Lithuanian
RUN  python -m spacy download xx_ent_wiki_sm  # Multi-language
RUN  python -m spacy download nb_core_news_sm # Norwegian Bokmål
RUN  python -m spacy download pl_core_news_sm # Polish
RUN  python -m spacy download pt_core_news_sm # Portuguese
RUN  python -m spacy download ro_core_news_sm # Romanian
RUN  python -m spacy download es_core_news_sm # Spanish


# remove for security purposes
# RUN rm /app/requirements.txt

## set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_ENV production
ENV SECRET_KEY $SECRET_KEY

# https://hub.docker.com/r/tiangolo/uwsgi-nginx-flask/
ENV UWSGI_INI /app/uwsgi.ini
ENV NGINX_WORKER_PROCESSES auto
ENV NGINX_WORKER_PROCESSES 2
ENV NGINX_WORKER_CONNECTIONS 1024
ENV NGINX_MAX_UPLOAD 1000m
ENV LISTEN_PORT 8080

EXPOSE 8080
