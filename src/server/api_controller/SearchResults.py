"""SearchResults Instantiated which contains response from SWAPI (in member results)"""

import requests
from flask import jsonify


class SearchResults:
    """
    Parameters
    ----------
    query: tuple 
       First element is the category, Second element is the user input string
    """

    def __init__(self, query, results=400):
        self._query = query
        self.results = results

    @property
    def results(self):
        return self._results

    @results.setter
    def results(self, value):
        def get_request(query):
            swapi_search_url = "https://swapi.co/api/{}/?search={}".format(
                query[0], query[1]
            )
            response_data = requests.get(swapi_search_url)
            jsoned_response = jsonify(response_data.json())

            return jsoned_response

        value = get_request(self._query)
        self._results = value

    def __repr__(self):
        return "{} Results return from SWAPI".format(self.results)


def create_search_results(query):
    search_results = SearchResults(query)
    return search_results.results
