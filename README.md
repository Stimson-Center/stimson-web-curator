stimson-web-curator
===================

Interactive curation of scraped web pages

Table of Contents
=================

   * [stimson-web-curator](#stimson-web-curator)
   * [Table of Contents](#table-of-contents)
   * [Getting Started](#getting-started)
      * [Git on the Server Generating Your SSH Public Key](#git-on-the-server-generating-your-ssh-public-key)
      * [Install the selenium-webdriver](#install-the-selenium-webdriver)
      * [Get the source code hierarchy](#get-the-source-code-hierarchy)
      * [Building](#building)
   * [Make a Google Custom Search Engine](#make-a-google-custom-search-engine)
   * [Make a Google Cloud Console "Project" to get API key](#make-a-google-cloud-console-project-to-get-api-key)
      * [Development RESTful API Server](#development-restful-api-server)
      * [Development GUI Server](#development-gui-server)
      * [Running Tests](#running-tests)
      * [Deploy](#deploy)
   * [Docker](#docker)
 
# Getting Started

```bash
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    xcode-select --install
    brew update
    brew upgrade
        
    brew install node
    node --version
        v8.7.0

    npm i -g npm to update 
    npm i -g npm
    npm install -g nwb
    nwb --version
        v0.21.0

    brew install python3
    python3 --version
        Python 3.7.4

    pip3 install -U pytest
    py.test --version
        This is pytest version 4.5.0, imported from /usr/local/lib/python3.7/site-packages/pytest.py

 ```

## Git on the Server Generating Your SSH Public Key

[Reference](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-)

```bash
open https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
```

```
check to make sure your github key has been added to the ssh-agent list.  Here's my ~/.ssh/config file

 Host github.com github
     IdentityFile ~/.ssh/id_rsa
     IdentitiesOnly yes
     UseKeyChain yes
     AddKeysToAgent yes
```

```bash
    cd ~/.ssh
    ssh-keygen -o
    ssh-add -K ~/.ssh/id_rsa
    ssh-add -L
```
## Install the selenium-webdriver

You must download and install the Selenium Chrome driver component so that website page scraping
can work properly. The driver for Chrome is a standalone executable that should be placed on your system
[PATH].

* Download the chrome driver that matches the host operating system of this project

```bash
    open https://sites.google.com/a/chromium.org/chromedriver/downloads
```
* unzip the file

```bash
   unzip chromedriver_mac64.zip
```
* copy the file to a directory or folder in the terminal window's search path

For example:
```bash
   cp -p chromedriver /usr/local/bin/
```

## Get the source code hierarchy

```bash
    cd ~
    git clone https://github.com/Stimson-Center/stimson-web-curator.git
```

Edit amplify/.config/local-env-info.json and replace the full path to the root of your project
Example: /Users/<your home directory>/GitHub/myweddingstay/stimson-web-curator

## Building

```bash
  cd ~/stimson-web-curator
  npm install
  pip3 install -r requirements.txt
```

# Make a Google Custom Search Engine

Go to https://www.google.com/cse/

Create a custom search engine

Get search engine ID

You can test the custom search engine by directly visiting its "Public URL" which is found in "Setup" => "Details" => "Public URL"

# Make a Google Cloud Console "Project" to get API key

Go to https://console.developers.google.com/apis/dashboard

Create a project or select

Enable APIs and services

Select Custom Search API and enable it

Click "Create credentials"

Get your credentials for Custom Search API

Go to Credentials and get API key

```bash
    cd ~/stimson-web-curator
    touch .env
    echo SKIP_PREFLIGHT_CHECK=true >> .env
    echo GOOGLE_SECRET_API_KEY="from google procedure above"
    echo GOOGLE_SECRET_CUSTOM_SEARCH_ID="from google procedure above"
```

Links:

[Google Developers Console - Projects (API Key)](https://console.developers.google.com/project)

[Best practices for securely using API keys](https://developers.google.com/console/help/new/#usingkeys)

[Google Custom Search Engine Setup (search Engine ID)](https://www.google.com/cse/all)

[Google CustomSearch API v1](http://developers.google.com/apis-explorer/#p/customsearch/v1)

- `npm run build` creates a production build by default.

   To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

- `npm run clean` will delete built resources.


## Development RESTful API Server

- `npm run start-api` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.


## Development GUI Server

- `npm run start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Deploy

```bash
    ./deploy.sh
```

# Docker

See DOCKER.md for more more details

```bash
    docker system prune --force
    docker build -t stimson-web-curator .  
    docker run --user seluser -p 3000:3000 -p 5000:5000 -it stimson-web-curator
    open http://localhost:3000
```

Note: the API server is running on port 5000, to optionall prove that it is working:

```bash
    open http://localhost:5000    
```

To debug docker container

```bash
    docker run  -it -v `pwd`:/usr/app --entrypoint=/bin/bash stimson-web-curator
```

