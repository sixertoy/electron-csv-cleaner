/* eslint
  import/prefer-default-export: 0
*/
const { protocol } = document.location;
export const BASE_URI = (process.env.NODE_ENV === 'development')
  ? `${protocol}//csvcleaner.smartcompanion.fr`
  : '';
