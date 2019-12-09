import os

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from rq import Queue
from rq.job import Job
from worker import conn
from jobs import count_words
from requests import get
from utility import sort_and_paginate


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
queue = Queue(connection=conn)
job_map = {}


"""
Checks if the URL requested has a job associated already, if not then a job
is submitted. Once the job is complete, this call will respond with the results
of the word count job ordered by provided or defaulted parameters.
"""
@app.route('/api/word_count', methods=['GET'])
@cross_origin()
def word_count_api():
    # Url to check and possibly request
    url = request.args.get('url', type=str)

    # Sort on either word or frequency (0 is word, 1 is frequency)
    sort = request.args.get('sort', default='word', type=str).lower()
    sort = 1 if sort == 'frequency' else 0

    # Sort order can be ascending or descending
    order = request.args.get('order', default='desc', type=str).lower()
    order = order if order in ['asc', 'desc'] else 'asc'

    # Page number to splice by
    page = request.args.get('page', default='1', type=str)
    page = int(page) - 1 if page.isdigit() else 0

    return handle_request(url, sort, order, page)


def handle_request(url, sort, order, page):
    # Check if URL already corresponds to a job
    if url not in job_map:
        job_map[url] = new_word_count_job(url)

    return word_count_job_results(url, sort, order, page)


def word_count_job_results(url, sort, order, page):
    job_id = job_map[url]

    try:
        job = Job.fetch(job_id, connection=conn)
    except:
        del job_map[url]
        return handle_request(url, sort, order, page)

    if job.is_finished:
        if not job.result:
            return "Invalid URL", 500
        
        ret = sort_and_paginate(job.result.items(), sort, order, page)
        return jsonify(ret), 200
    else:
        return "Job still processing", 202


def new_word_count_job(url):
    job = queue.enqueue_call(func=count_words, args=(url,), result_ttl=3600)
    return job.get_id()


if __name__ == '__main__':
    app.run()