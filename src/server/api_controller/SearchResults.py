"""Interacts with SWAPI to get search query results"""

import requests
from flask import jsonify


class SearchResults:
    def __init__(self, query):
        self.results = self.get_request(query)

    def get_request(self, query):
        swapi_search_url = "https://swapi.co/api/{}/?search={}".format(
            query[0], query[1]
        )

        response_data = requests.get(swapi_search_url)
        jsoned_response = jsonify(response_data.json())

        return jsoned_response

    def __repr__(self):
        return "{} These are results produced by make_request method".format(
            self.results
        )


def create_search_results(query):
    search_results = SearchResults(query)
    return search_results.results

