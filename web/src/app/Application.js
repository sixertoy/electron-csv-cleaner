import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

// application
import './application.css';
import FilesTable from './components/FilesTable';
import FilesUploadForm from './components/FilesUploadForm';
import ApplicationFooter from './components/ApplicationFooter';
// import promisifyFiles from './lib/promisify-files';

class MainScreen extends Component {

  constructor (props) {
    super(props);
    this.state = {
      delimiter: ';',
      regex: '\\r\\n\\t"',
      selections: [].concat(props.files)
    };
    // this.renderTableItem = this.renderTableItem.bind(this);
    // this.onSelectHandler = this.onSelectHandler.bind(this);
    // this.onProceedHandler = this.onProceedHandler.bind(this);
  }

  onProceedHandler () {
    /*
    const {
      regex,
      selections
    } = this.state;
    const opts = {
      delimiter: this.state.delimiter,
      regex: new RegExp(`[${regex}]`, 'gi')
    };
    const promises = selections.map(filepath =>
      promisifyFiles(filepath, opts));
    Promise.all(promises)
      .then(() => {})
      .catch((err) => { throw new Error(err); });
      */
  }

  onSelectHandler (evt) {
    /*
    const file = evt.target.value;
    this.setState(({ selections }) => ({
      selections: (selections.indexOf(file) !== -1)
        ? selections.filter(value => (value !== file))
        : selections.concat([file])
    }));
    */
  }

  onRegexHandler (evt) {
    // const { value } = evt.target;
    // this.setState({ regex: value });
  }

  onDelimiterHandler (evt, value) {
    // evt.preventDefault();
    // this.setState({ delimiter: value });
  }

  render () {
    // const { files, cancel } = this.props;
    // const iscomma = (this.state.delimiter === ',') ? 'active' : '';
    // const issemicolon = (this.state.delimiter === ';') ? 'active' : '';
    // if (!files) return (<Redirect to="/" />);
    return [
      <FilesUploadForm key="uploadform" />,
      <div className="flex-rows" key="filestable">
        <FilesTable />
        <ApplicationFooter onSave={() => {}} onCancel={() => {}} />
      </div>
    ];
  }
}

MainScreen.propTypes = {
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
)(MainScreen);
