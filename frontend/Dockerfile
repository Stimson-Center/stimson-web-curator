# Docker file for a slim Ubuntu-based Python3 image

# build environment
FROM node:10 as react-build
LABEL maintainer="cooper@pobox.com"
USER root

RUN apt-get -y update
# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
COPY . /usr/app
WORKDIR /usr/app

# Install app dependencies
RUN npm install

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /usr/app/build /usr/share/nginx/html
EXPOSE 8080

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
# CMD ["sh", "-c", "npm start"]
# CMD ["sh", "-c", "./start.sh"]
CMD ["nginx", "-g", "daemon off;"]

