"""
RecentSearchItem : Class used for creating recent search list, 
, updating, clearing recent list.
"""

import dbcontroller

from dbcontroller.redis_instance import create_rconn
from flask import jsonify


class RecentSearchItem:
    """
    Class used to create recent search list, and update recent search list
    
    Parameters
    ----------
    rconn: redis instance/connection
        connection to the redis db
    query: string
        search query string from user input
    """

    def __init__(self, query=None, results=None):
        self._query = query
        self._rconn = create_rconn()
        self._rset_key = "recent:search"
        self.results = results

    @property
    def results(self):
        return self._results

    @results.setter
    def results(self, value):
        if not value:
            self._results = self._parse_recent()
        else:
            print(
                "self._recent_searches argument should not be passed into constructor"
            )

    def update_recent_searches(self):
        try:
            self._rconn.sadd(self._rset_key, self._query)
            print("Query added to set", self._query)
        except:
            return "An error has occurred updating recent searches"

    def clear_recent_searches(self):
        try:
            self._rconn.delete(self._rset_key)
            print("Successfully deleted Key")
        except:
            return "An error has occurred clearing recent searches"

    def _parse_recent(self):
        try:
            rset = self._rconn.smembers(self._rset_key)

            search_list = [
                self._decoder(member)
                for member in rset
                if len(self._decoder(member)) > 0
            ]
            print("Recent SEARCH LIST", search_list)

            return jsonify(search_list)
        except:
            return "An error has occurred parsing recent searches"

    def _decoder(self, item):
        return item.decode("utf-8")
