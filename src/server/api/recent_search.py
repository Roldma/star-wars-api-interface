"""
RecentSearchControl : Class used for creating recent search list, and updating
get_recent() : function returning a recent search list from redis db (instantiated from RecentSearchControl)
update_recent(arg:string) : function updating recent search list in redis db
clear_recent() : function deleting recent searches key in redis DB
"""

import dbcontroller
from dbcontroller.redis_instance import create_rconn
from flask import jsonify


class RecentSearchControl:
    """
    Class used to create recent search list, and update recent search list
    
    Parameters
    ----------
    rconn: redis instance/connection
        connection to the redis db
    query: string
        search query string from user input
    """

    def __init__(self, rconn, query=None, recent_searches=None):
        self._query = query
        self._rconn = rconn
        self._rset_key = "recent:search"
        self.recent_searches = recent_searches

    @property
    def recent_searches(self):
        return self._recent_searches

    @recent_searches.setter
    def recent_searches(self, value):
        if not value:
            self._recent_searches = self._parse_recent()
        else:
            print(
                "self._recent_searches argument should not be passed into constructor"
            )

    def update_recent_searches(self):
        self._rconn.sadd(self._rset_key, self._query)
        print("Query added to set", self._query)

    def clear_recent_searches(self):
        self._rconn.delete(self._rset_key)
        print("Successfully deleted Key")
        pass

    def _parse_recent(self):
        rset = self._rconn.smembers(self._rset_key)

        search_list = [
            self._decoder(member) for member in rset if len(self._decoder(member)) > 0
        ]
        print("Recent SEARCH LIST", search_list)

        return jsonify(search_list)

    def _decoder(self, item):
        return item.decode("utf-8")


def create_controller(query=None):
    if query:
        controller = RecentSearchControl(create_rconn(), query)
    elif not query:
        controller = RecentSearchControl(create_rconn())

    return controller


def get_recent():
    """Retrieves recent search list from redis db"""
    recent_list = create_controller().recent_searches
    return recent_list


def update_recent(query):
    """
    Updates recent:search key in redis database
    
    Parameters
    ----------
    query: string
        string from user input search
    """
    controller = create_controller(query)
    return controller.update_recent_searches()


def clear_recent():
    controller = create_controller()
    return controller.clear_recent_searches()
