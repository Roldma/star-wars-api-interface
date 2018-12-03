const resourceNames = () => ({
  recent: {
    name: 'recent',
    paths: {
      list: 'list',
      results: 'result',
    },
  },

  search: {
    name: 'search',
  },

  bookmarks: {
    name: 'bookmarks',
  },
});

const createList = item => Object.values(item);

const listOfResourceNames = createList(resourceNames());

export default listOfResourceNames;
