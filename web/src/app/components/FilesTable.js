import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './filestable.css';
import { selectFile } from './../actions';

const FilesTable = ({
  files,
  selections,
  onSelectHandler
}) => (
  <div id="filestable">
    <table className="table-striped">
      <thead>
        <tr>
          <th className="selectcol">
            <i className="icon icon-check" />
          </th>
          <th className="filecol">
            <span>File</span>
          </th>
          <th className="sizecol">
            <span>Date</span>
          </th>
          <th className="sizecol">
            <span>Size</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {files && files.map((fileobj, index) => (
          <tr key={`file::${index}`}>
            <td className="selectcol">
              <input type="checkbox"
                value={fileobj.name} onChange={onSelectHandler}
                checked={(selections.indexOf(fileobj.name) !== -1)} />
            </td>
            <td className="filecol">
              <span>{fileobj.name}</span>
            </td>
            <td className="sizecol">
              <span>{fileobj.mtime}</span>
            </td>
            <td className="sizecol">
              <span>{fileobj.size}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

FilesTable.propTypes = {
  files: PropTypes.array.isRequired,
  selections: PropTypes.array.isRequired,
  onSelectHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  files: state.files,
  selections: state.selections
});

const mapDispatchToProps = dispatch => ({
  onSelectHandler: evt => dispatch(selectFile(evt.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesTable);
