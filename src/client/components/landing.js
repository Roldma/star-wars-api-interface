import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="Landing">
    <div className="landing__link__wrapper">
      <Link to="/search" className="landing__swapi">
        LETS SWAPI
      </Link>
    </div>
  </div>
);
