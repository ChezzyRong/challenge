FROM ubuntu:latest

RUN apt-get update \
  && apt-get install -y redis \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . ./

WORKDIR /usr/src/app/challenge
CMD redis-server & python3 worker.py & python3 app.py
