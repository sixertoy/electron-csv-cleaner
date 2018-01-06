import path from 'path';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

// application
import promisifyFiles from './lib/promisify-files';

class ConvertScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      delimiter: ';',
      selections: [].concat(props.files)
    };
    this.onSelectHandler = this.onSelectHandler.bind(this);
    this.onProceedHandler = this.onProceedHandler.bind(this);
  }

  onProceedHandler () {
    const { selections } = this.state;
    const opts = {
      delimiter: this.state.delimiter,
      regex: new RegExp(/[\r\n\t"]/, 'gi')
    };
    const promises = selections.map(filepath =>
      promisifyFiles(filepath, opts));
    Promise.all(promises)
      .then(() => {})
      .catch((err) => { throw new Error(err); });
  }

  onSelectHandler (evt) {
    const file = evt.target.value;
    this.setState(({ selections }) => ({
      selections: (selections.indexOf(file) !== -1)
        ? selections.filter(value => (value !== file))
        : selections.concat([file])
    }));
  }

  render () {
    const { selections } = this.state;
    const { files, cancel } = this.props;
    if (!files) return (<Redirect to="/" />);
    return (
      <div id="convert-screen">
        {/*
        <div id="convert-screen-header">
          <label htmlFor="delimiter-field">
            <span>Delimiter</span>
            <input type="text" name="delimiter-field"
              maxLength="1" defaultValue=";" />
          </label>
          <label htmlFor="replacer-field">
            <span>Replacer</span>
            <input type="text" name="replacer-field" defaultValue="\t" />
          </label>
        </div>
        */}
        <div>
          {files.map((file, index) => {
            const key = `file::${index}`;
            const ischecked = (selections.indexOf(file) !== -1);
            const filename = path.basename(file, path.extname(file));
            return (
              <p key={key}>
                <label htmlFor={key}>
                  <input type="checkbox" checked={ischecked}
                    name={key} value={file} onChange={this.onSelectHandler} />
                  <span>{filename}</span>
                </label>
              </p>
            );
          })}
        </div>
        <div>
          <button onClick={cancel}>
            <span>Cancel</span>
          </button>
          <button onClick={this.onProceedHandler}>
            <span>Convert</span>
          </button>
        </div>
      </div>
    );
  }
}

ConvertScreen.propTypes = {
  cancel: PropTypes.func.isRequired,
  files: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]).isRequired
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(push('/'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertScreen);
