"""Interacts with SWAPI to get search query results"""

import requests
from flask import jsonify


class SearchResults:
    def __init__(self, qstring):
        self.results = self.makeRequest(qstring)

    def makeRequest(self, qstring):
        swapi_search_url = "https://swapi.co/api/people/?search={}".format(qstring)
        request_data = requests.get(swapi_search_url)
        jsoned_request = jsonify(request_data.json())
        print("THIS IS JSONED", jsoned_request)
        print("REQUEST DATA WITHIN SEARHCH RESULTS CLASS", request_data)
        print("JSON DATA? IS TYPE {}".format(type(request_data)), request_data.json())
        return jsoned_request

    def __repr__(self):
        return "{} these are our results babbY!!!!!!!!!!!!!".format(self.results)


def create_search_results(qstring):
    search_results = SearchResults(qstring)
    return search_results.results


# test = create_search_results("tits")
# print(test)

