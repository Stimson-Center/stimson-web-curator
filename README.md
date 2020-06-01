stimson-web-curator
===================


Client GUI for Data Curation

Table of Contents
=================

   * [stimson-web-curator](#stimson-web-curator)
   * [Getting Started](#getting-started)
      * [Get the source code hierarchy](#get-the-source-code-hierarchy)
      * [Building](#building)
      * [Development RESTful API Server](#development-restful-api-server)
      * [Development GUI Server](#development-gui-server)
      * [Running Tests](#running-tests)
      * [Deploy](#deploy)
      
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
