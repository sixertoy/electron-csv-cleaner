import React from 'react';
import PropTypes from 'prop-types';

// application
import './applicationfooter.css';

const ApplicationFooter = ({
  onSave,
  onCancel
}) => (
  <div id="application-footer">
    <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
        <button onClick={onCancel}
          className="btn btn-default">
          <i className="icon icon-trash" />
          <span>Clear</span>
        </button>
        <button onClick={onSave}
          className="btn btn-primary pull-right">
          <i className="icon icon-floppy" style={{ color: '#FFFFFF' }} />
          <span>Save</span>
        </button>
      </div>
    </footer>
  </div>
);

ApplicationFooter.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ApplicationFooter;
