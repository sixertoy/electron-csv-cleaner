import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './filesuploadform.css';
import { uploadFile } from './../actions';

class FilesUploadForm extends Component {

  constructor (props) {
    super(props);
    this.fileinput = null;
    this.onFileUploadChange = this.onFileUploadChange.bind(this);
  }

  onFileUploadChange () {
    const { files } = this.fileinput;
    this.props.onUploadFile(files);
  }

  renderFileIput () {
    return (
      <input type="file" name="file" id="fileuploadinput"
        onChange={this.onFileUploadChange}
        ref={(input) => { this.fileinput = input; }} />
    );
  }

  render () {
    const {
      error,
      loading
    } = this.props;
    return (
      <div id="filesuploadform" className={`${error ? 'error' : ''}`}>
        <label htmlFor="fileuploadinput">
          <span><i className="icon icon-upload-cloud" /></span>
          {(error || loading) ? null : this.renderFileIput()}
        </label>
      </div>
    );
  }
}

FilesUploadForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onUploadFile: PropTypes.func.isRequired,
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
  onUploadFile: files => dispatch(uploadFile(files))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesUploadForm);
