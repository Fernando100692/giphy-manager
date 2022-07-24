// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import GiphyHome from '../../pages/GiphyHome';
import MySavedGifs from '../../pages/MySavedGifs';

const App = () => {

  return (
    <>
        <Routes>
            <Route  path={''} element={<GiphyHome />} />
            <Route  path={'/favorites'} element={<MySavedGifs />} />
        </Routes>
    </>
  );
};

/**
 * @name App.propTypes
 * @type { Object }
 */
App.propTypes = {};

/**
 * Default props
 */
App.defaultProps = {};

export default App;