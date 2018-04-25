import $ from 'jquery';
import getCollectionController from './offersController';
import searchDataController from './searchDataController';
import myFavourites from './collectionController';
import { cityId, searchBtn, contentArea, contentTitle, API_KEY, searchQry, homeNav } from './my-keys';

$(() => {
  getCollectionController(null, cityId, contentArea, API_KEY, contentTitle);

  return false;
});

$('.button-collapse').bind('click', (event) => {
  event.preventDefault();
});

searchBtn.bind('click', () => {
  searchDataController(contentArea, API_KEY, searchQry);
});


homeNav.bind('click', (event) => {
  getCollectionController(event, cityId, contentArea, API_KEY, contentTitle);
});

$('#list-nav').bind('click', (event) => {
  myFavourites(event);
});
