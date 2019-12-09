from requests import get
from utility import word_count_from_html


def count_words(url):
    try:
        with get(url) as response:
            response.raise_for_status()
            return word_count_from_html(response)
    except:
        return []