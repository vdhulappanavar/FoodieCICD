import { contentArea, contentTitle } from './my-keys';

export default function errorController(err) {
  contentArea.html('');
  contentTitle.html('<p>Something went wrong....:(');
  throw (err);
}
