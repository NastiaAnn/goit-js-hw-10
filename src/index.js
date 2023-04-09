import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));

function handleInputSearch(event) {
  event.preventDefault();
  if (event.target.value === '') {
    return;
  }
  const seekedCountry = event.target.value.trim();
  fetchCountries(seekedCountry)
    .then(countries => {
      renderCountryList(countries);
    })
    .catch(() => {
      countryList.innerHTML = '';
      countryCard.innerHTML = '';
      Notify.failure(`Oops, there is no country with that name`);
    });
}

function renderCountryList(countries) {
  if (countries.length >= 10) {
    countryList.innerHTML = '';
    countryCard.innerHTML = '';
    Notify.info(`Too many matches found. Please enter a more specific name.`);
  } else if (countries.length === 1) {
    renderCountryCardMarkup(countries);
  } else {
    renderCountryListMarkup(countries);
  }
}

function renderCountryCardMarkup(countries) {
  const country = countries[0];
  const markup = `
        <div class="country_item">
        <img src="${country.flags.svg}" alt="${country.name.official}">
        <h2>${country.name.official}</h2>
        </div>
          <p><b>Capital:</b> ${country.capital}</p>
          <p><b>Population:</b> ${country.population.toLocaleString()}</p>
          <p><b>Languages:</b> ${Object.values(country.languages).join(
            ', '
          )}</p>
        </div>
    `;
  countryList.innerHTML = '';
  countryCard.innerHTML = markup;
}

function renderCountryListMarkup(countries) {
  const markup = countries
    .map(country => {
      return `
          <li class="country_item">
            <img src="${country.flags.svg}" alt="${country.name.official}">
            <p><b>${country.name.common}</b></p>
          </li>
        `;
    })
    .join('');
  countryList.innerHTML = markup;
  countryCard.innerHTML = '';
}
