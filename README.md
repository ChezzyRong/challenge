# URL text word counter

A simple web app to count words given url with simple sorting functionalities for results, as well as a history for all previous queries.

## Architecture and decisions

The project uses react on the front-end with npm serving the files. The back-end server which does all the computing tasks is written python using flask and redis.

Flask is used because it's extremely lightweight and quick to prototype. React is used because it's the standard solution for single page applications and allows for a nice seperation between logic and views. Redis is used as our in memory storage and job queue because it integrated nicely with Python, allows Flask to dispatch jobs to workers and handle other requests in an almost async way.

### Prerequisites

You need Python 3.7.3, node.js and redis for running this project. You can download the installer for python3 and node.js from their official websites below:

* [node.js](https://nodejs.org/en/)
* [python](https://www.python.org)

For redis, if you are on Mac OS and you have brew, do `brew install redis`

To set up the project for dev, clone this repo.

### Setting up the front-end

Assume you are in the `/challenge` directory, to spin up the front-end:

```
cd client
npm install
npm start

```
Go to the address localhost:3000 you and you should see a single page app.


### Setting up the back-end

Assume you are in the `/challenge` directory, to spin up the back-end:

```
cd server
pip install -r requirements.txt
cd challenge
redis-server #assuming redis is installed at this point
python worker.py
python app.py

```
If redis is running correctly and all of the above commands work, you should be able to call the api directly on localhost:5000.

## Running the tests

Assuming you're in the `/challenge` directory, you can follow the instructions below for the backend and front end tests.

### Backend tests

```
cd server
python -m unittest
```

### Frontend tests

```
cd client
npm test
```

## A few nice-to-haves in the future

For simplicity, this project implemented the bare minimum to meet the functional requirements whilst keeping the code readable. Dependent on the deployment process and server/client architecture choice of the future, a few more things can be implemented

* Configs for different environment
* Back-end persistence with database
* Removing `@cross_origin()` from flask and whitelist client url on a proxy sitting in front of the flask app
* Api versioning
* More testing, especially integration and end to end tests

And much more!

## Built With

* [Flask](https://pypi.org/project/Flask/) - A web server framework
* [npm](https://www.npmjs.com) - Frontend dependency management
* [React](https://reactjs.org) - Frontend UI framework
* [Redis](https://redis.io) - An in-memory job queue for backend

## Authors

* **Li Rong** - *Initial work*
