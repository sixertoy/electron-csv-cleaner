import React from 'react';
import PropTypes from 'prop-types';
import orderby from 'lodash.orderby';
import { connect } from 'react-redux';

import './filestable.css';
import timestamp from './../lib/timestamp';
import {
  deleteFile,
  downloadFile } from './../actions';

const FilesTable = ({
  files,
  onDeleteHandler,
  onDownloadHandler
}) => (
  <div id="filestable">
    <table className="table-striped">
      <thead>
        <tr>
          <th className="timecol">
            <span>Date</span>
          </th>
          <th className="filecol">
            <span>File</span>
          </th>
          <th className="sizecol hide-on-small">
            <span>Size</span>
          </th>
          <th className="buttoncol" />
          <th className="buttoncol" />
        </tr>
      </thead>
      <tbody>
        {files && orderby(files, ['mtime'], ['desc']).map(fileobj => (
          <tr key={fileobj.id}>
            <td className="timecol">
              <span className="hide-on-large">{timestamp(fileobj.mtime, true)}</span>
              <span className="hide-on-small">{timestamp(fileobj.mtime)}</span>
            </td>
            <td className="filecol">
              <span>{fileobj.name}</span>
            </td>
            <td className="sizecol hide-on-small">
              <span>{fileobj.size}</span>
            </td>
            <td className="buttoncol">
              <button className="btn button-negative"
                onClick={() => onDeleteHandler(fileobj)}>
                <i className="icon icon-trash" />
                <span className="hide-on-small">Delete</span>
              </button>
            </td>
            <td className="buttoncol">
              <button className="btn button-positive"
                onClick={() => onDownloadHandler(fileobj)}>
                <i className="icon icon-install" />
                <span className="hide-on-small">Download</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

FilesTable.propTypes = {
  files: PropTypes.array.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onDownloadHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  onDeleteHandler: ({ id }) => dispatch(deleteFile(id)),
  onDownloadHandler: ({ id }) => dispatch(downloadFile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesTable);
