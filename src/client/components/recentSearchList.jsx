import React from 'react';

const RecentSearchList = (props) => {
  const { searchList } = props;
  console.log(searchList);
  let uniqueId = 0;

  const recentList = searchList.map((str) => {
    uniqueId += 1;
    return <li key={`rSearch${uniqueId}`}>{str}</li>;
  });

  return (
    <div>
      <ul>{recentList}</ul>
    </div>
  );
};

export default RecentSearchList;
