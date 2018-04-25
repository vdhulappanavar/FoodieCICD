import { applicationState } from './my-keys';
import myFavourites from './collectionController';

export default function addToCollection(event, result) {
  event.preventDefault();
  applicationState.restaurautToBeAdded = result;
  myFavourites(event);
}
