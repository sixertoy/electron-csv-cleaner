import React from 'react';

const ApplicationSettings = ({

}) => (
  <div id="application-settings">
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
            onChange={evt => this.onRegexHandler(evt)}
            value={this.state.regex} />
        </div>
      </div>
    </header>
  </div>
);

export default ApplicationSettings;
