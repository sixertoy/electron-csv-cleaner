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

  render () {
    return (
      <div id="filesuploadform">
        <label htmlFor="fileuploadinput">
          <span><i className="icon icon-upload-cloud" /></span>
          <input type="file" name="file" id="fileuploadinput"
            onChange={this.onFileUploadChange}
            ref={(input) => { this.fileinput = input; }} />
        </label>
      </div>
    );
  }
}

FilesUploadForm.propTypes = {
  onUploadFile: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onUploadFile: files => dispatch(uploadFile(files))
});

export default connect(
  null,
  mapDispatchToProps
)(FilesUploadForm);
