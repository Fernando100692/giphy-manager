// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const NavLayout = ({ left, center, right }) => {
  return (
    <nav className="navbar navbar-expand-lg shadow-md py-4 px-4 bg-white fixed flex items-center w-full justify-between">
      {left}
      {center}
      {right}
    </nav>
  );
};

NavLayout.propTypes = {
    left: PropTypes.element,
    center: PropTypes.element,
    right: PropTypes.element
};

NavLayout.defaultProps = {
    left: <div />,
    center: <div />,
    right: <div />,
};

export default NavLayout;