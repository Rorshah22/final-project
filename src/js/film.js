import '../scss/app.scss';
const film = JSON.parse(localStorage.getItem('film'));

import 'regenerator-runtime/runtime';

async function getGenres() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=9ac7200b1a1544e39020d2a5d7e48e5b',
  );
  const genres = await response.json();
  // получаем жанры фильма
  let arrGenres = [];
  for (let j = 0; j < film.genre_ids.length; j++) {
    const element = film.genre_ids[j];
    genres.genres.map(function (item) {
      if (element === item.id) {
        return arrGenres.push(item.name);
      }
    });
  }
  const allGenres = arrGenres.join(', ');

  document.title = `${film.title}`;
  // отрисовка информации о фильме
  const galery = document.querySelector('.galery-films');
  galery.innerHTML = `
    <div class="info-page">
    <img class="poster" src="https://image.tmdb.org/t/p/w500${film.poster_path}" onError="this.src='../images/content/unnamed.jpg'" alt="">
    <div class="info-film">
    <h2>${film.title}</h2>
    <p>${film.overview}</p>
        <span><b>Genres: </b> ${allGenres}</span>
    <span><b>Vote average:</b> ${film.vote_average}</span>
    <span><b>Vote count:</b> ${film.vote_count}</span>
    <span><b>Popularity,:</b> ${film.popularity}</span>
    <span><b>Release date:</b> ${film.release_date}</span>
    </div>`;
}
getGenres();

// возврат на домашнюю страницу
const home = document.querySelector('.home-page');
home.addEventListener('click', (e) => {
  window.location = 'index.html';
});
