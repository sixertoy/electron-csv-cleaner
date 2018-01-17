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
          const files = Array.from(evt.dataTransfer.files)
            .filter(fileobj => (fileobj.type === 'text/csv'))
            .map(({ path, size }) => ({ path, size }));
          if (files.length) onUploadFiles(files);
        }} >
        <div>
          <p style={{ textAlign: 'center' }}>
            <i style={{ fontSize: '3em' }}
              className="icon icon-upload-cloud" />
          </p>
          <p style={{
            opacity: 0.45,
            fontSize: '0.7em',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
            <span>Drop your files here</span>
          </p>
        </div>
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
