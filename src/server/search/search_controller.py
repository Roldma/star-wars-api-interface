"""
SearchController: perform search functions, such as retrieve results of recent request or basic search request, update/delete recent.
    Methods:
    ----------
    get_results: gets results for a basic or recent search
    update_recent: updates recent search list in redis
    clear_recent: clears recent search list in redis cache
"""

from .search_response import BasicSearchItem
from .recent_search import RecentSearchItem


class SearchController:
    """
    Controller for search functions
    
    Parameters
    ----------
    query: string
        used to query redis cache or SWAPI
    search_type: string
        'recent' or 'basic' to determine where to get results and what to do
    """

    def __init__(self, query=None, search_type=None):
        self._query = query
        self._search_type = search_type
        self._controller = None

    @property
    def _controller(self):
        return self.__controller

    @_controller.setter
    def _controller(self, val):
        if self._search_type == "recent":
            if not self._query:
                self.__controller = RecentSearchItem()
            else:
                self.__controller = RecentSearchItem(self._query)

        elif self._search_type == "basic":
            self.__controller = BasicSearchItem(self._query)

    def get_results(self):
        try:
            results = self._controller.results
            return results
        except:
            return "Error retrieving results"

    def update_recent(self):
        try:
            rec_control = RecentSearchItem(self._query)
            rec_control.update_recent_searches()
        except:
            return "Error updating recent list"

    def clear_recent(self):
        try:
            self._controller.clear_recent_searches()
        except:
            return "Error has occured clearing recent list"


def create_controller(q, search_type):
    """
    Function to instantiate SearchController
    
    Parameters:
    -----------
    **q: string
        user input from request
    **search_type: string
        'basic' or 'recent' indicating search type
    
    Returns:
        SearchController instance
    """
    return SearchController(q, search_type)
