import math
import nltk
import re

from bs4 import BeautifulSoup
from collections import Counter
from operator import itemgetter


def sort_and_paginate(items, sort, order, page):
    numPages = math.ceil(len(items) / 10)

    sorted_items = sorted(
        items,
        key=itemgetter(sort),
        reverse=True if order == 'desc' else False
    )[page:page + 10]

    return { "data": sorted_items, "pages": numPages}


def word_count_from_html(response):
    text = BeautifulSoup(response.text, 'html.parser').get_text()
    tokens = nltk.word_tokenize(text)
    words = [t for t in tokens if re.compile('.*[A-Za-z].*').match(t)]
    return Counter(words)
