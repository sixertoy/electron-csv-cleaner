import path from 'path';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import React, { Component } from 'react';

// application
import promisifyFiles from './lib/promisify-files';
import promisifyWrite from './lib/promisify-write';
import promisifyDatas from './lib/promisify-datas';

class ConvertScreen extends Component {

  constructor (props) {
    super(props);
    this.state = { selections: [].concat(props.files) };
    this.onSelectHandler = this.onSelectHandler.bind(this);
    this.onProceedHandler = this.onProceedHandler.bind(this);
  }

  onProceedHandler () {
    const { selections } = this.state;
    Promise.all(selections.map(promisifyFiles))
      .then(collections => Promise.all(collections.map(promisifyDatas)))
      .then(collections => Promise.all(collections.map(promisifyWrite)))
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
    const { files } = this.props;
    const { selections } = this.state;
    if (!files) return (<Redirect to="/" />);
    return (
      <div>
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
          <button onClick={this.onProceedHandler}>
            <span>Convert</span>
          </button>
        </div>
      </div>
    );
  }
}

ConvertScreen.propTypes = {
  files: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]).isRequired
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  null
)(ConvertScreen);
