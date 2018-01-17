import * as bytes from 'bytes';

// application
import { BASE_URI } from './../constants';

const loadingStart = () => ({
  type: 'onLoadingStart'
});

const loadingComplete = () => ({
  type: 'onLoadingComplete'
});

const loadingError = message => ({
  type: 'onLoadingError',
  message
});

const fileUploaded = file => ({
  type: 'onFileUploaded',
  file
});

const fileDeleted = fileid => ({
  type: 'onFileDeleted',
  fileid
});

const onFetchResponse = (response, asblob = false) => {
  switch (response.status) {
  case 200:
    console.log('response', response);
    return asblob
      ? response.blob()
      : response.json();
  case 404:
  case 204:
    throw new Error(`ERROR: (${response.status}) File not found`);
  default:
    throw new Error(`ERROR: (${response.status}) ${response.statusText}`);
  }
};

export const discardError = () => ({
  type: 'onDiscardError'
});

export const downloadFile = id => (dispatch) => {
  dispatch(loadingStart());
  const formdata = new FormData();
  formdata.append('fileid', id);
  fetch(`${BASE_URI}/download.php`, {
    method: 'POST',
    body: formdata
  })
    .then(resp => onFetchResponse(resp, true))
    .then((blob) => {
      const content = new Blob([blob], { type: 'octet/stream' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'download.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      // dispatch(loadingComplete());
      // dispatch(fileDeleted(id));
    })
    .catch((err) => {
      dispatch(loadingComplete());
      dispatch(loadingError(err.message));
    });
};

export const deleteFile = id => (dispatch) => {
  dispatch(loadingStart());
  const formdata = new FormData();
  formdata.append('fileid', id);
  fetch(`${BASE_URI}/delete.php`, {
    method: 'POST',
    body: formdata
  })
    .then(onFetchResponse)
    .then(() => {
      dispatch(loadingComplete());
      dispatch(fileDeleted(id));
    })
    .catch((err) => {
      dispatch(loadingComplete());
      dispatch(loadingError(err.message));
    });
};

export const uploadFile = files => (dispatch) => {
  dispatch(loadingStart());
  const file = files[0];
  const formdata = new FormData();
  formdata.append('file', file);
  fetch(`${BASE_URI}/upload.php`, {
    method: 'POST',
    body: formdata
  })
    .then(onFetchResponse)
    .then((result) => {
      if (result.error) throw new Error(`ERROR: (200) ${result.error}`);
      else {
        dispatch(loadingComplete());
        dispatch(fileUploaded(({
          id: result.id,
          name: file.name,
          type: file.type,
          size: bytes(file.size),
          mtime: Date.now(),
          ctime: file.lastModified
        })));
      }
    })
    .catch((err) => {
      dispatch(loadingComplete());
      dispatch(loadingError(err.message));
    });
};
