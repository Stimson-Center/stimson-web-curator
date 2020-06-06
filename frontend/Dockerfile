# Docker file for a slim Ubuntu-based Python3 image

FROM node:12
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update
# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

# ENV TZ=UTC
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# RUN apt-get install -y tzdata

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1001 ubuntu
RUN chown -R ubuntu:root /home/ubuntu

RUN mkdir -p /usr/app
RUN chown -R ubuntu:root /usr/app
USER ubuntu
WORKDIR /usr/app

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
COPY . /usr/app

# Install app dependencies
RUN npm install

EXPOSE 3000

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["sh", "-c", "npm start"]
