/* eslint
  import/prefer-default-export: 0
*/
import * as bytes from 'bytes';

const loadingStart = () => ({
  type: 'onLoadingStart'
});

const loadingComplete = () => ({
  type: 'onLoadingComplete'
});

const fileUploading = files => ({
  type: 'onFileUploading',
  files
});

export const selectFile = name => ({
  type: 'onSelectFile',
  name
});

export const uploadFile = files => (dispatch) => {
  const entries = Array.from(files)
    .map(fileobj => ({
      name: fileobj.name,
      type: fileobj.type,
      size: bytes(fileobj.size),
      mtime: new Date(fileobj.lastModified).toLocaleDateString()
    }));
  dispatch(loadingStart());
  dispatch(fileUploading(entries));
  // console.log('files', files);
};
