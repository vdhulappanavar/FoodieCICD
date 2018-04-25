import $ from 'jquery';
import { contentArea, applicationState } from './my-keys';
import myFavourites from './collectionController';

export function addCollection(collectionName) {
  const collectionDetails = {};
  collectionDetails.collectionName = collectionName;
  collectionDetails.restaurantList = [];
  if (applicationState.restaurautToBeAdded) {
    collectionDetails.restaurantList.push(applicationState.restaurautToBeAdded);
    applicationState.restaurautToBeAdded = null;
  }
  applicationState.userCollection.push(collectionDetails);
}

export function createCollectionView() {
  const row = $('<div>', { class: 'row' }).appendTo(contentArea);
  const column = $('<div>', { class: 'col m12' }).appendTo(row);
  const panel = $('<div>', { class: 'card-panel' }).appendTo(column);
  $('<h2>', { html: 'Create new collection' }).appendTo(panel);
  $('<input>', { id: 'collectionName', placeholder: 'Enter a name for your Collection' }).appendTo(panel);
  const createColl = $('<button>', { class: 'waves-red', html: 'Create' }).appendTo(panel);
  createColl.bind('click', (event) => {
    addCollection($('#collectionName').val());
    myFavourites(event);
  });
}

export function addToExistingCollection(event, collection) {
  event.preventDefault();
  applicationState.userCollection.forEach((element) => {
    if (element.collectionName === collection.collectionName) {
      element.restaurantList.push(applicationState.restaurautToBeAdded);
      applicationState.restaurautToBeAdded = null;
    }
  });
}

export function editCollection(newName, collIndex) {
  applicationState.userCollection[collIndex].collectionName = newName;
}

export function deleteCollection(index) {
  applicationState.userCollection.splice(index, 1);
}

export function deleteRestaurant(collName, resName) {
  applicationState.userCollection.forEach((element) => {
    if (element.collectionName === collName) {
      element.restaurantList.forEach((data) => {
        if (data.name === resName) {
          element.restaurantList.splice(element.restaurantList.indexOf(data), 1);
        }
      });
    }
  });
}
