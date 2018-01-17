import React from 'react';
import PropTypes from 'prop-types';

// application
import './applicationfooter.css';

const ApplicationFooter = ({
  onClearHandler
}) => (
  <div id="application-footer">
    <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
        <button onClick={onClearHandler}
          className="btn btn-default">
          <i className="icon icon-trash" />
          <span>Clear</span>
        </button>
      </div>
    </footer>
  </div>
);

ApplicationFooter.propTypes = {
  onClearHandler: PropTypes.func.isRequired
};

export default ApplicationFooter;
