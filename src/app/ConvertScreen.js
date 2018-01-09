import path from 'path';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as byteSize from 'byte-size';
import { Redirect } from 'react-router';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

// application
import './convertscreen.css';
import promisifyFiles from './lib/promisify-files';

const styles = {
  selectcol: {
    width: '40px',
    textAlign: 'center'
  },
  sizecol: {
    fontSize: '0.6em'
  },
  pathline: {
    display: 'block',
    fontSize: '0.6em'
  }
};

const renderTableHeader = () => (
  <thead>
    <tr>
      <th style={styles.selectcol}><i className="icon icon-check" /></th>
      <th><span>File</span></th>
      <th />
    </tr>
  </thead>
);

class ConvertScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      delimiter: ';',
      regex: '\\r\\n\\t"',
      selections: [].concat(props.files)
    };
    this.renderTableItem = this.renderTableItem.bind(this);
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

  onDelimiterHandler (evt, value) {
    evt.preventDefault();
    this.setState({ delimiter: value });
  }

  renderTableItem (fileobj, index) {
    const { selections } = this.state;
    const key = `file::${index}`;
    const size = byteSize(fileobj.size, { units: 'iec_octet' });
    const ischecked = (selections.indexOf(fileobj) !== -1);
    return (
      <tr key={key}>
        <td style={styles.selectcol}>
          <input type="checkbox" checked={ischecked}
            name={key} value={fileobj.path} onChange={this.onSelectHandler} />
        </td>
        <td style={styles.filecol}>
          <em style={styles.pathline}>{path.dirname(fileobj.path)}</em>
          <span>{path.basename(fileobj.path, path.extname(fileobj.path))}</span>
        </td>
        <td style={styles.sizecol}>
          <span>{size.value}{size.unit}</span>
        </td>
      </tr>
    );
  }

  render () {
    const { files, cancel } = this.props;
    const iscomma = (this.state.delimiter === ',') ? 'active' : '';
    const issemicolon = (this.state.delimiter === ';') ? 'active' : '';
    if (!files) return (<Redirect to="/" />);
    return (
      <div id="convert-screen">
        <div id="convert-screen-header">
          <header className="toolbar toolbar-header">
            <div className="toolbar-actions">
              <div className="btn-group">
                <button onClick={evt => this.onDelimiterHandler(evt, ';')}
                  className={`${issemicolon} btn btn-large btn-default`}>
                  <span style={{ fontWeight: '900' }}>;</span>
                </button>
                <button onClick={evt => this.onDelimiterHandler(evt, ',')}
                  className={`${iscomma} btn btn-large btn-default`}>
                  <span style={{ fontWeight: '900' }}>,</span>
                </button>
              </div>
              <div className="form-control">
                <input type="text" className="form-control"
                  onChange={() => {}}
                  value={this.state.regex} />
              </div>
            </div>
          </header>
        </div>
        <div id="convert-screen-table">
          <table className="table-striped">
            {renderTableHeader()}
            <tbody>{files.map(this.renderTableItem)}</tbody>
          </table>
        </div>
        <div id="convert-footer">
          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
              <button onClick={cancel}
                className="btn btn-default">
                <span>Cancel</span>
              </button>
              <button onClick={this.onProceedHandler}
                className="btn btn-primary pull-right">
                <span>Save</span>
              </button>
            </div>
          </footer>
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
