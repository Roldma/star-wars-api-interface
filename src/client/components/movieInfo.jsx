import React from 'react';

const MovieInfo = props => {
  // console.log(props);
  const { state } = props;
  console.log('this is the selected Films Initially: ', state.selectedFilms);

  const info = Object.entries(state.chars[state.selectedChar].info).map(
    ([key, value], index) => {
      if (key !== 'films') {
        return <div key={`${key} ${index}`}>{`${key}: ${value} `} </div>;
      }
    }
  );
  const films = state.selectedFilms.map((value, index) => {
    return <div key={`${value} ${index}`}>{value}</div>;
  });
  // console.log('films: ', films);

  return (
    <div>
      <div>{info}</div>
      <br />
      <div>
        Films with this Character: <br /> {films}
      </div>
    </div>
  );
};

export default MovieInfo;
