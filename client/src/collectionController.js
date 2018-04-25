import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';
import 'jquery-ui/ui/widgets/dialog';
import { contentArea, contentTitle, applicationState } from './my-keys';
import { createCollectionView, addToExistingCollection, editCollection, deleteCollection, deleteRestaurant } from './collectionActionsController';


export default function myFavourites(event) {
  event.preventDefault();
  contentTitle.html('Favourite Restaurants');
  contentArea.html('');


  if (applicationState.userCollection[0]) {
    const row = $('<div>', { class: 'row' }).appendTo(contentArea);
    const column = $('<div>', { class: 'col m12' }).appendTo(row);
    const panel = $('<div>', { class: 'card-panel' }).appendTo(column);

    // Setting the page header
    if (applicationState.restaurautToBeAdded) {
      $('<h3>', { html: 'Select collection' }).appendTo(panel);
    } else {
      $('<h3>', { html: 'My Favourites' }).appendTo(panel);
    }
    // Displaying the collection list
    const collectionList = $('<ul>', { class: 'collection' }).appendTo(panel);
    applicationState.userCollection.forEach((collection) => {
      const collectionData = $('<li>', { class: 'collection-item', html: collection.collectionName }).appendTo(collectionList);
      collectionData.bind('click', () => {
        if (applicationState.restaurautToBeAdded) {
          addToExistingCollection(event, collection);
          myFavourites(event);
        }
      });
      // Displaying the action list for the collection
      const actions = $('<span>', { class: 'right' }).appendTo(collectionData);
      const edit = $('<i>', { class: 'material-icons', html: 'edit' }).appendTo(actions);
      edit.css('cursor', 'pointer');
      edit.bind('click', () => {
        collectionData.html('');
        const changeCollName = $('<div>', { class: 'row' });
        collectionData.html(changeCollName);
        const inputCol = $('<div>', { class: 'input-field col s6' }).appendTo(collectionData);
        const changeInput = $('<input>', { value: collection.collectionName, class: 'validate' }).appendTo(inputCol);
        const change = $('<i>', { class: 'material-icons', html: 'check' }).appendTo(inputCol);
        change.css('cursor', 'pointer');
        change.bind('click', () => {
          editCollection(changeInput.val(), applicationState.userCollection.indexOf(collection));
          myFavourites(event);
        });
        const noChange = $('<i>', { class: 'material-icons', html: 'clear' }).appendTo(inputCol);
        noChange.css('cursor', 'pointer');
        noChange.bind('click', () => {
          myFavourites(event);
        });
      });


      const del = $('<i>', { class: 'material-icons', html: 'delete' }).appendTo(actions);
      del.css('cursor', 'pointer');
      del.bind('click', (e) => {
        e.preventDefault();
        deleteCollection(applicationState.userCollection.indexOf(collection));
        myFavourites(event);
      });

      // Displaying the restaurants inide the collections
      if (collection.restaurantList[0]) {
        const restaurants = $('<ul>', { class: 'collection' }).appendTo(collectionData);
        restaurants.sortable();
        restaurants.disableSelection();
        collection.restaurantList.forEach((restaurant) => {
          const rest = $('<li>', { class: 'collection-item ui-state-default', html: restaurant.name }).appendTo(restaurants);
          const actionRes = $('<span>', { class: 'right' }).appendTo(rest);
          const delRes = $('<i>', { class: 'material-icons', html: 'delete' }).appendTo(actionRes);
          delRes.css('cursor', 'pointer');
          delRes.bind('click', () => {
            deleteRestaurant(collection.collectionName, restaurant.name);
            myFavourites(event);
          });
        });
      }
    });
    createCollectionView();
  } else {
    createCollectionView();
  }
}
