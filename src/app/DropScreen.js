import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './dropscreen.css';
import { uploadFiles } from './actions';

const mockDefaultBehavior = (evt) => {
  evt.preventDefault();
  return false;
};

class DropScreen extends Component {

  componentDidMount () {}

  render () {
    const { onUploadFiles } = this.props;
    return (
      <div id="dropscreen"
        onDragEnd={evt => mockDefaultBehavior(evt)}
        onDragOver={evt => mockDefaultBehavior(evt)}
        onDragLeave={evt => mockDefaultBehavior(evt)}
        onDrop={(evt) => {
          evt.preventDefault();
          // console.log('evt.dataTransfer.files', evt.dataTransfer.files);
          const files = Array.from(evt.dataTransfer.files)
            .filter(fileobj => (fileobj.type === 'text/csv'))
            .map(fileobj => fileobj.path);
          if (files.length) onUploadFiles(files);
        }} >
        <p>Drop your files here</p>
      </div>
    );
  }
}

DropScreen.propTypes = {
  onUploadFiles: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onUploadFiles: (files) => {
    dispatch(uploadFiles(files));
    dispatch(push('/convert'));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(DropScreen);
