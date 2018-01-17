import React from 'react';
import PropTypes from 'prop-types';
import orderby from 'lodash.orderby';
import { connect } from 'react-redux';

import './filestable.css';
import { BASE_URI } from './../constants';
import { deleteFile } from './../actions';

const FilesTable = ({
  files,
  onDeleteHandler
}) => (
  <div id="filestable">
    <table className="table-striped">
      <thead>
        <tr>
          <th className="sizecol">
            <span>Date</span>
          </th>
          <th className="filecol">
            <span>File</span>
          </th>
          <th className="sizecol">
            <span>Size</span>
          </th>
          <th className="sizecol" />
          <th className="sizecol" />
        </tr>
      </thead>
      <tbody>
        {files && orderby(files, ['date']).map(fileobj => (
          <tr key={fileobj.id}>
            <td className="sizecol">
              <span>{fileobj.mtime}</span>
            </td>
            <td className="filecol">
              <span>{fileobj.name}</span>
            </td>
            <td className="sizecol">
              <span>{fileobj.size}</span>
            </td>
            <td className="buttoncol">
              <button className="delete"
                onClick={() => onDeleteHandler(fileobj)}>
                <span>delete</span>
              </button>
            </td>
            <td className="buttoncol">
              <a download className="button download"
                href={`${BASE_URI}/uploads/${fileobj.id}`}>
                <span>download</span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

FilesTable.propTypes = {
  files: PropTypes.array.isRequired,
  onDeleteHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  onDeleteHandler: id => dispatch(deleteFile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesTable);
