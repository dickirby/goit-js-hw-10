import axios from 'axios';

const api_key =
  'live_IW0wv3Nv6S3rcZwbh3KNIOKRZeYWCf7nf9XcA22kPe7nvGRVpauM0sJK50HSZInB';

axios.defaults.headers.common['x-api-key'] = api_key;

const breed_url = 'https://api.thecatapi.com/v1/breeds?api_key';
const images_url = 'https://api.thecatapi.com/v1/images/search?api_key';

export const fetchBreeds = () => {
  return fetch(`${breed_url}=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const fetchImages = breedId => {
  return fetch(`${images_url}=${api_key}&breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};
