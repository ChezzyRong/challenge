# URL text word counter

A simple web app to count words given url with simple sorting functionalities
for results, as well as a history for all previous queries.

## Screenshots

<details>
<summary>Show screenshots</summary>

### Initial
![Alt text](/screenshots/initial.png?raw=true "No requests")

### Valid URL with results
![Alt text](/screenshots/success.png?raw=true "Request with results")

### Invalid URL
![Alt text](/screenshots/failure.png?raw=true "Request with error")
</details>

## Architecture and decisions

The project uses react on the front-end with npm serving the files. The back-end server which does all the computing tasks is written python using flask and redis.

Flask is used because it's extremely lightweight and quick to prototype. React is used because it's the standard solution for single page applications and allows for a nice seperation between logic and views. Redis is used as our in memory storage and job queue because it integrated nicely with Python, allows Flask to dispatch jobs to workers and handle other requests in an almost async way.

# Running the app

## Running with Docker

<details>
<summary>Details</summary>

#### Prerequisites

In order to run this through docker on your machine, you'll need the following
dependencies:

- [docker](https://www.docker.com/)

#### Steps

```
# Confirm versions
docker -v  # Should be 19.03.5

# Clone project
git clone https://github.com/ChezzyRong/challenge.git
cd challenge

# Start docker (Assuming you're in /challenge)
docker-compose up --build -d
```

Once docker-compose finishes you should be able to launch the app on
localhost:3000/

</details>

## Running with Command line

<details>
<summary>Details</summary>

#### Prerequisites

In order to run this locally on your machine, you'll need the following
dependencies:

- [python](https://www.python.org)
- [node.js](https://nodejs.org/en/)
- [redis](https://redis.io/)

#### Steps

```
# Confirm versions
node -v                 # Should be 8.16.2
npm -v                  # Should be 6.4.1
python3 --version       # Should be 3.6.9
pip3 —version           # Should be 9.0.1
redis-server --version  # Should be 4.0.9

# Clone project
git clone https://github.com/ChezzyRong/challenge.git
cd challenge

# Start the front end (Assuming you're in /challenge)
cd client/
npm install
npm start # Use 'npm start &' to run as background task

# Start the backend (Assuming you're in /challenge)
cd server/
pip3 install -r requirements.txt
cd challenge/
redis-server &
python3 worker.py &
python3 app.py & 
```

Once the above has completed you should be able to visit the app on
localhost:3000/

</details>

# Running the tests

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

# A few nice-to-haves in the future

For simplicity, this project implemented the bare minimum to meet the functional requirements whilst keeping the code readable. Dependent on the deployment process and server/client architecture choice of the future, a few more things can be implemented

- Configs for different environment
- Back-end persistence with database
- Removing `@cross_origin()` from flask and use a proxy to avoid CORS
- API versioning
- More testing, especially integration and end to end tests

And much more!

## Built With

- [Flask](https://pypi.org/project/Flask/) - A web server framework
- [npm](https://www.npmjs.com) - Frontend dependency management
- [React](https://reactjs.org) - Frontend UI framework
- [Redis](https://redis.io) - An in-memory job queue for backend

## Authors

- **Li Rong** - _Initial work_
