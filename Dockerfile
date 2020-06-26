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
RUN apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev systemd

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y tzdata

RUN pip3 --no-cache-dir install virtualenv

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
RUN (export SUDO_FORCE_REMOVE=yes && apt-get -y purge sudo)

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
WORKDIR /usr/app/frontend
RUN npm install

WORKDIR /usr/app
#RUN service stimson-web-api start
EXPOSE 3000 5000
#RUN ls -la /usr/app

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["bash", "-c", "./start.sh"]

