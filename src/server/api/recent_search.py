"""
RecentSearch : Class used for creating recent search list, and updating
get_recent() : function returning a recent search list from redis db (instantiated from RecentSearchControl)
update_recent(arg:string) : function updating recent search list in redis db
clear_recent() : function deleting recent searches key in redis DB
"""

import dbcontroller
import search_response

from search_response import BasicSearchItem
from dbcontroller.redis_instance import create_rconn
from flask import jsonify


class RecentSearch:
    """
    Class used to create recent search list, and update recent search list
    
    Parameters
    ----------
    rconn: redis instance/connection
        connection to the redis db
    query: string
        search query string from user input
    """

    def __init__(self, query=None, recent_searches=None):
        self._query = query
        self._rconn = create_rconn()
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

    def _parse_recent(self):
        rset = self._rconn.smembers(self._rset_key)

        search_list = [
            self._decoder(member) for member in rset if len(self._decoder(member)) > 0
        ]
        print("Recent SEARCH LIST", search_list)

        return jsonify(search_list)

    def _decoder(self, item):
        return item.decode("utf-8")


class SearchController:
    def __init__(self, query=None, search_type=None, action=None, control_type=None):
        self._query = query
        self._search_type = search_type
        self._action = action
        self._control_type = control_type
        # NEED TO USE ARRAY OF ARGS?? need to figure out how to deal with out of position arguments

    @property
    def _control_type(self):
        return self.__control_type

    @_control_type.setter
    def _control_type(self, val):
        if val == "recent":
            if not self._query:
                self.__control_type = RecentSearch()
            else:
                self.__control_type = RecentSearch(self._query)

        elif val == "basic":
            self.__control_type = BasicSearchItem(self._query)

    def get_results(self):
        if self._search_type == "recent":
            results = self._control_type.recent_searches

        elif self._search_type == "basic":
            basic_search = BasicSearchItem(self._query)
            results = basic_search.results

        return results

    def update_recent(self):
        try:
            rec_control = RecentSearch(self._query)
            rec_control.update_recent_searches()
        except:
            return "Error updating recent list"

    def clear_recent(self):

        pass


def create_controller(query=None):
    if query:
        controller = RecentSearch(query)
    elif not query:
        controller = RecentSearch()
    # try:
    #     search_type = query["search_type"]
    # except KeyError:
    #     return 'Key "search_type" required in query object'
    # r_conn = create_rconn()
    # controller = SearchController(r_conn, query, search_type)
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
