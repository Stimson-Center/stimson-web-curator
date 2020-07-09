# Docker file for a slim Ubuntu-based Python3 image

FROM node:10
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update
# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1001 ubuntu
RUN chown -R ubuntu:root /home/ubuntu

RUN mkdir -p /app
RUN chown -R ubuntu:root /app
USER ubuntu

# Bundle app source
COPY . /app
WORKDIR /app

# Install app dependencies
RUN npm install
# RUN npm run build
# RUN CI=true npm test

EXPOSE 3000

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["sh", "-c", "npm run start"]
