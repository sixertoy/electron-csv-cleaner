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

const fileDeleted = () => ({
  type: 'onFileDeleted'
});

export const discardError = () => ({
  type: 'onDiscardError'
});

export const deleteFile = () => (dispatch) => {
  dispatch(loadingStart());
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
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error(`ERROR: (${response.status}) ${response.statusText}`);
    })
    .then((result) => {
      if (result.error) throw new Error(`ERROR: (200) ${result.error}`);
      else {
        dispatch(loadingComplete());
        dispatch(fileUploaded(({
          id: result.id,
          name: file.name,
          type: file.type,
          size: bytes(file.size),
          mtime: new Date(file.lastModified).toLocaleDateString()
        })));
      }
    })
    .catch((err) => {
      dispatch(loadingComplete());
      dispatch(loadingError(err.message));
    });
};
