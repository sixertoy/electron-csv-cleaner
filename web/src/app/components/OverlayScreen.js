import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './overlayscreen.css';
import { discardError } from './../actions';
import loader from './../../assets/loader.svg';

const renderLoader = () => (
  <div className="loader">
    <img src={loader} className="app-loader" alt="loader" />
  </div>
);
const renderError = (message, discardHandler) => (
  <div className="error">
    <p><b>{message}</b></p>
    <p>
      <button onClick={discardHandler}>
        <span>Close</span>
      </button>
    </p>
  </div>
);

const OverlayScreen = ({
  error,
  loading,
  discardErrorHandler
}) => (
  <div id="overlayscreen" className="absolute flex-rows">
    {!loading ? null : renderLoader()}
    {!error ? null : renderError(error, discardErrorHandler)}
  </div>
);

OverlayScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  discardErrorHandler: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  discardErrorHandler: () => dispatch(discardError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayScreen);
