import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="Landing">
    <div className="landing__link__wrapper">
      <Link to="/charList" className="landing__swapi_link">
        Test it out by choosing a character!
      </Link>
      <div>
        <Link to="/searchSwapi" className="landing_swapi_link">
          Go straight to searching Star Wars stuff!
        </Link>
      </div>
    </div>
  </div>
);

export default Landing;
