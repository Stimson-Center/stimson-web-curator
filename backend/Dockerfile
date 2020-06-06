# Docker file for a slim Ubuntu-based Python3 image

FROM selenium/standalone-chrome-debug:latest
LABEL maintainer="cooper@pobox.com"
USER root

# Needed for string substitution
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update
RUN apt-get -y install build-essential libpoppler-cpp-dev pkg-config python-dev libpoppler-dev

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

RUN ${PIP} --no-cache-dir install virtualenv

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832

RUN mkdir -p /usr/app
RUN chown -R seluser:seluser /usr/app
USER seluser
COPY . /usr/app

WORKDIR /usr/app
RUN virtualenv venv
RUN source venv/bin/activate
RUN ${PIP} --no-cache-dir install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python"]

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
# CMD ["sh", "-c", "./start.sh"]
CMD ["api/app.py"]


