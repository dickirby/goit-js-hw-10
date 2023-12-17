import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchImages } from './cat-api';

const breed = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

loader.hidden = true;
breed.addEventListener('change', event => {
  loader.hidden = false;
  div.hidden = true;
  const breedId = event.target.value;
  fetchImages(breedId)
    .then(breeds => renderBreedDesc(breeds))
    .catch(error => err())
    .finally(() => {
      loader.hidden = true;
      div.hidden = false;
    });
});

function err() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

const renderOptions = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join();
  breed.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
};

const renderBreedDesc = breed => {
  div.innerHTML = '';
  const { url } = breed[0];
  const markupPicture = `<img class="image" src="${url}" alt="${breed[0].breeds[0].name}">`;
  const markupDescript = `<h2 class="header">${breed[0].breeds[0].name}</h2>
    <p class="paragraph">${breed[0].breeds[0].description}</p>
    <p class="paragraph"><b>Temperament:</b> ${breed[0].breeds[0].temperament}</p>`;
  div.insertAdjacentHTML('beforeend', markupPicture);
  div.insertAdjacentHTML('beforeend', markupDescript);
};

const breedAndFetch = () => {
  fetchBreeds()
    .then(breeds => renderOptions(breeds))
    .catch(error => err());
};

breedAndFetch();
