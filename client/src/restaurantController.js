import $ from 'jquery';
import { contentArea, contentTitle, API_KEY } from './my-keys';
import addToCollection from './addCollectionController';
import errorController from './errorController';

function restaurantView(result) {
  const placeHolder = 'http://via.placeholder.com/350x150';
  contentArea.html('');
  contentTitle.html('');
  const card = $('<div>', { class: 'card' }).appendTo(contentArea);
  const row = $('<div>', { class: 'row' }).appendTo(card);
  card.css('padding-bottom', '50px');
  const column = $('<div>', { class: 'col m12' }).appendTo(row);
  const cardContent = $('<div>', { class: 'card-content' }).appendTo(column);
  $('<h2>', { html: result.name }).appendTo(cardContent);
  const contentRow = $('<div>', { class: 'row' }).appendTo(card);
  const imageColumn = $('<div>', { class: 'col s4' }).appendTo(contentRow);
  $('<img>', { src: (result.thumb) ? result.thumb : placeHolder, alt: result.name, class: 'responsive-img left' }).appendTo(imageColumn);
  const contentColumn = $('<div>', { class: 'col s8' }).appendTo(contentRow);
  $('<address>', { html: `${result.location.address},<br>${result.location.locality},<br>${result.location.city}` }).appendTo(contentColumn);
  $('<p>', { html: `Average Cost for two: ${result.currency} ${result.average_cost_for_two}` }).appendTo(contentColumn);
  $('<p>', { html: result.cuisines }).appendTo(contentColumn);
  const review = $('<div>').appendTo(contentColumn);
  const reviewContent = $('<p>', { html: `${result.user_rating.rating_text} ` }).appendTo(review);
  $('<span>', { class: 'new badge', 'data-badge-caption': 'ratings', html: `${result.user_rating.aggregate_rating}<br>` }).appendTo(reviewContent);
  $('<a>', { href: result.menu_url, class: 'btn btn-primary', html: 'View Menu' }).appendTo(contentColumn);

  const addtoCollection = $('<a>', { html: 'Add to favourites', class: 'btn btn-danger' }).appendTo(contentColumn);
  addtoCollection.bind('click', (event) => {
    addToCollection(event, result);
  });
  addtoCollection.css('margin-left', '20px');
}

function getRestaurantData(restId) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('user-key', API_KEY);
  const initObject = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
  };

  fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restId}`, initObject)
    .then(result => result.json())
    .then((result) => {
      restaurantView(result);
    })
    .catch((err) => {
      errorController(err);
    });
}


export default function viewRestaurantController(event, restId) {
  event.preventDefault();
  getRestaurantData(restId);
}
