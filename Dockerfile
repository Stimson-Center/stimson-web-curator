# Docker file for a slim Ubuntu-based Python3 image

FROM selenium/standalone-chrome-debug:latest
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update
RUN apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev
# sudo apt-get -y install libpoppler58=0.41.0-0ubuntu1 libpoppler-dev libpoppler-cpp-dev


ARG USE_PYTHON_3_NOT_2=True
ARG _PY_SUFFIX=${USE_PYTHON_3_NOT_2:+3}
ARG PYTHON=python${_PY_SUFFIX}
ARG PIP=pip${_PY_SUFFIX}

# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

RUN apt-get update && apt-get install -y  ${PYTHON}-pip

RUN ${PIP} --no-cache-dir install --upgrade pip setuptools

# Some TF tools expect a "python" binary
RUN ln -s $(which ${PYTHON}) /usr/local/bin/python

#COPY bashrc /etc/bash.bashrc
#RUN chmod a+rwx /etc/bash.bashrc

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y tzdata

# Install Node.js
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
COPY . /home/seluser

WORKDIR /home/seluser
RUN ${PIP} --no-cache-dir install virtualenv
# RUN virtualenv venv
# RUN source venv/bin/activate
RUN ${PIP} --no-cache-dir install -r requirements.txt

# Install app dependencies
RUN npm install


# EXPOSE 4444, 3000, 5000
EXPOSE 3000 5000

USER seluser


#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["sh", "-c", "/home/seluser/start.sh"]

