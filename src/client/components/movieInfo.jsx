import React from 'react';

const MovieInfo = (props) => {
  const { state } = props;

  const info = Object.entries(state.chars[state.selectedChar].info).map(([key, value], index) => {
    if (key !== 'films') {
      return <div key={`${key} ${index}`}>{`${key}: ${value} `}</div>;
    }
  });
  const films = state.selectedFilms.map((value, index) => (
    <div key={`${value} ${index}`}>{value}</div>
  ));

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
