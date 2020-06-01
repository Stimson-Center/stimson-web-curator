stimson-web-curator
===================

Interactive curation of scraped web pages

Table of Contents
=================

   * [stimson-web-scraper](#stimson-web-scraper)
   * [Table of Contents](#table-of-contents)
      * [Getting Started on Mac OS](#getting-started-on-mac-os)
      * [Install Desktop tools](#install-desktop-tools)
         * [Download GitHub desktop](#download-github-desktop)
         * [Optionally Download PyCharm Professional](#optionally-download-pycharm-professional)
      * [Git on the Server Generating Your SSH Public Key](#git-on-the-server-generating-your-ssh-public-key)
      * [Install the selenium-webdriver](#install-the-selenium-webdriver)
      * [get project source code](#get-project-source-code)
      * [Getting started with Web Scraping](#getting-started-with-web-scraping)
         * [Execute test suite to ensure environmental integrity](#execute-test-suite-to-ensure-environmental-integrity)
         * [Execute as an Python3 executable](#execute-as-an-python3-executable)
         * [Execute as an Python3 package](#execute-as-an-python3-package)
            * [Get an article from a Website Page](#get-an-article-from-a-website-page)
            * [Foreign Language Websites](#foreign-language-websites)
            * [Extract text from Adobe PDF files in any ISO language](#extract-text-from-adobe-pdf-files-in-any-iso-language)
            * [Get all of the URLs within a Website](#get-all-of-the-urls-within-a-website)
            * [Get a Wikipedia Article including embedded tables](#get-a-wikipedia-article-including-embedded-tables)
      * [Optionally Setting up a Docker environment](#optionally-setting-up-a-docker-environment)
   * [Contributing](#contributing)
      
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
