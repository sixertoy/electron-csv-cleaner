import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

// application
import './application.css';
import FilesTable from './components/FilesTable';
import OverlayScreen from './components/OverlayScreen';
import FilesUploadForm from './components/FilesUploadForm';
import ApplicationFooter from './components/ApplicationFooter';

class MainScreen extends Component {

  render () {
    const {
      error,
      loading
    } = this.props;
    return [
      (!loading && !error) ? null : <OverlayScreen key="overlayscreen" />,
      <FilesUploadForm key="uploadform" />,
      <div id="application-content-table" className="flex-rows" key="filestable">
        <FilesTable />
        <ApplicationFooter onClearHandler={() => {}} />
      </div>
    ].filter(notnull => notnull);
  }
}

MainScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired,
  files: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]).isRequired
};

const mapStateToProps = state => ({
  files: state.files,
  error: state.error,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(push('/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
