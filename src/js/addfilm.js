import '../scss/app.scss';
import { getUser } from './role';
import 'regenerator-runtime/runtime';
async function getGenres() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=9ac7200b1a1544e39020d2a5d7e48e5b',
  );
  const genres = await response.json();

  for (let i = 0; i < genres.genres.length; i++) {
    const element = genres.genres[i];
    const optionElement = document.createElement('option');
    optionElement.textContent = element.name;
    optionElement.value = element.id;
    document.querySelector('#genres').append(optionElement);
  }
}
getGenres();
