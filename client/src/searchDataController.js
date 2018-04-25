import $ from 'jquery';
import { contentTitle } from './my-keys';
import viewRestaurantController from './restaurantController';
import addToCollection from './addCollectionController';
import errorController from './errorController';


function searchDataView(contentArea, searchArray, searchQry) {
  const placeHolder = 'http://via.placeholder.com/350x150';
  contentArea.html('');
  contentTitle.html(`Search results for ${searchQry.val()}`);

  for (let i = 0; i < searchArray.length; i += 3) {
    const row = $('<div>', { class: 'row' }).appendTo(contentArea);
    for (let j = 0; j < 3; j += 1) {
      if (searchArray[i+j]) {
        const column = $('<div>', { class: 'col s12 m4' }).appendTo(row);
        const card = $('<div>', { class: 'card' }).appendTo(column);
        const cardImage = $('<div>', { class: 'card-image' }).appendTo(card);
        if (searchArray[i + j].restaurant.thumb) {
          $('<img>', {
            src: searchArray[i + j].restaurant.thumb, alt: searchArray[i + j].restaurant.name, class: 'responsive-img', height: '200px',
          }).appendTo(cardImage);
        } else {
          $('<img>', {
            src: placeHolder, alt: searchArray[i + j].restaurant.name, class: 'responsive-img', height: '200px',
          }).appendTo(cardImage);
        }
        const cardContent = $('<div>', { class: 'card-content' }).appendTo(card);
        $('<span>', { class: 'card-title activator grey-text text-darken-4', html: searchArray[i + j].restaurant.name }).appendTo(cardContent);
        $('<address>', { html: searchArray[i + j].restaurant.location.address }).appendTo(cardContent);
        $('<p>', { html: `Average Cost for two: ${searchArray[i + j].restaurant.currency} ${searchArray[i + j].restaurant.average_cost_for_two}` }).appendTo(cardContent);
        $('<p>', { html: `Cuisines : ${searchArray[i + j].restaurant.cuisines}` }).appendTo(cardContent);
        $('<p>', { html: `${searchArray[i + j].restaurant.user_rating.rating_text}<span class="badge>"${searchArray[i + j].restaurant.user_rating.aggregate_rating}</span>` }).appendTo(cardContent);

        const cardAction = $('<div>', { class: 'card-action' }).appendTo(card);

        const viewRes = $('<a>', { html: 'View' }).appendTo(cardAction);
        const addRes = $('<a>', { html: 'Add to Favourites' }).appendTo(cardAction);

        viewRes.bind('click', (event) => { viewRestaurantController(event, searchArray[i + j].restaurant.R.res_id); });
        addRes.bind('click', (event) => { addToCollection(event, searchArray[i + j].restaurant); });
      }
    }
  }
}

function getSearchData(contentArea, API_KEY, searchQry) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };
  fetch(`https://developers.zomato.com/api/v2.1/search?q=${searchQry.val()}&count=30`, initObject)
    .then(result => result.json())
    .then((result) => {
      const searchArray = result.restaurants;
      searchDataView(contentArea, searchArray, searchQry);
    })
    .catch((err) => {
      errorController(err);
    });
}

export default function searchDataController(contentArea, API_KEY, searchQry) {
  getSearchData(contentArea, API_KEY, searchQry);
}
