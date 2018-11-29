import React from 'react';

const RecentSearchListDisplay = (props) => {
  const { recentSearchList } = props;

  let uniqueId = 0;

  const recentList = recentSearchList.map((str) => {
    uniqueId += 1;
    return <li key={`rSearch${uniqueId}`}>{str}</li>;
  });

  return <div>{<ul>{recentList}</ul>}</div>;
};

export default RecentSearchListDisplay;
