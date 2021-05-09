//делаем запрос на сервер и отрисовываем результат
async function getBase(url) {
  const response = await fetch(url);
  const film = await response.json();

  const galery = document.querySelector('.galery-films');
  galery.innerHTML = '';
  function creatCardFilm(i) {
    galery.innerHTML += `<div class="card-film">
    <div class="vote" hidden>${film.results[i].vote_average}</div>
    <div class="date" hidden>${film.results[i].release_date}</div>
		<figure>
		<img class="poster" src="https://image.tmdb.org/t/p/w500${film.results[i].poster_path}" onError="this.src='../images/content/unnamed.jpg'" alt="">
		<figcapt
    ion>${film.results[i].title}</figcaption>
		</figure>
		</div>`;
  }

  for (let i = 0; i < film.results.length; i++) {
    creatCardFilm(i);
  }
  //отрисовка информации о фильме
  const poster = document.querySelectorAll('.poster');
  const buttons = document.querySelector('.pagination-buttons');
  for (let i = 0; i < poster.length; i++) {
    poster[i].addEventListener('click', (e) => {
      buttons.classList.add('hidden');
      document.querySelector('.select').style = 'visibility: hidden';
      // получаем жанры фильма
      let arrGenres = [];
      for (let j = 0; j < film.results[i].genre_ids.length; j++) {
        const element = film.results[i].genre_ids[j];
        genres.genres.map(function (item) {
          if (element === item.id) {
            return arrGenres.push(item.name);
          }
        });
      }
      const allGenres = arrGenres.join(', ');
      galery.innerHTML = `<div class="info-page">	
      <img class="poster" src="https://image.tmdb.org/t/p/w500${film.results[i].poster_path}" onError="this.src='../images/content/unnamed.jpg'" alt=""> 
      <div class="info-film">
      <h2>${film.results[i].title}</h2>
      <p>${film.results[i].overview}</p>
      <span><b>Genres: </b> ${allGenres}</span>
      <span><b>Vote average:</b> ${film.results[i].vote_average}</span>
      <span><b>Vote count:</b> ${film.results[i].vote_count}</span>
      <span><b>Popularity,:</b> ${film.results[i].popularity}</span>
      <span><b>Release date:</b> ${film.results[i].release_date}</span>
      </div>
      </div>`;

      console.log(film.results[i]);
    });
  }

  // возврат на домашнюю страницу
  const home = document.querySelector('.home-page');
  home.addEventListener('click', (e) => {
    getBase(
      myUrl(
        `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100`,
      ),
    );
    buttons.classList.remove('hidden');
    select.style = '';
    select.value = 'none';
  });
}
//импортируем рендер кнопок пангинации
import { pageNumbers, PaginationButton } from './page';
const paginationButtons = new PaginationButton(15, 5, 1);
paginationButtons.render();

paginationButtons.onChange((e) => {
  page = e.target.value;
  getBase(myUrl(page));
});

let page = 1;
let url = '';
const select = document.querySelector('.select');
//фильтр сортировки
select.addEventListener('click', (e) => {
  getBase(myUrl(1));
});

function myUrl(page) {
  const LINK =
    'https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=';
  const SORT = {
    popularityDasc: 'popularity.desc',
    popularityAsc: 'popularity.asc',
    releaseDateDesc: 'release_date.desc',
    releaseDateAsc: 'release_date.asc',
  };
  const PAGE = `&include_adult=false&include_video=false&page=${page}`;
  const VOTE = '&vote_count.gte=100';

  if (select.value === 'none' || select.value === 'rating_dec') {
    return (url = LINK + SORT.popularityDasc + PAGE + VOTE);
  }
  if (select.value === 'rating_asc') {
    return (url = LINK + SORT.popularityAsc + PAGE + VOTE);
  }
  if (select.value === 'release_date_des') {
    return (url = LINK + SORT.releaseDateDesc + PAGE + VOTE);
  }
  if (select.value === 'release_date_asc') {
    return (url = LINK + SORT.releaseDateAsc + PAGE + VOTE);
  }
}

getBase(myUrl());

///////////////
const genres = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
};

async function getGenres() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=9ac7200b1a1544e39020d2a5d7e48e5b',
  );
  const genres = await response.json();
}
