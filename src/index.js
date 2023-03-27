import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

input.addEventListener('input', handleInputSearch);

function handleInputSearch(event) {
  event.preventDefault();
  const seekedCountry = event.target.value.trim();
  // console.log(seekedCountry);

  console.log(fetchCountries(seekedCountry));
}
