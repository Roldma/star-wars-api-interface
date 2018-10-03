import React from 'react';

const MovieInfo = (props) => {
  const { state } = props;
  const { chars, selectedChar, selectedFilms } = state;
  let uniqKey = 0;
  const info = Object.entries(chars[selectedChar].info).map(([key, value]) => {
    uniqKey += 1;
    if (key !== 'films') {
      return <div key={`${key} ${uniqKey}`}>{`${key}: ${value} `}</div>;
    }
  });

  uniqKey = 0;

  const films = selectedFilms.map((val) => {
    uniqKey += 1;
    return (
      <div key={`movie${uniqKey}`}>
        <span>{`title: ${val.title} `}</span>
        <span>{`date: ${val.date}`}</span>
      </div>
    );
  });

  return (
    <div>
      <div>{info}</div>
      <br />
      <div>
        Films with this Character:
        <div>{films}</div>
      </div>
    </div>
  );
};

export default MovieInfo;
