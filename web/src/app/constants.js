/* eslint
  import/prefer-default-export: 0
*/
export const BASE_URI = (process.env.NODE_ENV === 'development')
  ? 'http://csvcleaner.smartcompanion.fr'
  : '';
