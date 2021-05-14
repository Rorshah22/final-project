// запрос пользователей
import { users } from './user';
// window.store = users;
let user = JSON.parse(localStorage.getItem('user'));
console.log(user);
// создаем роли

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
  // на страницу фильма
  const poster = document.querySelectorAll('.poster');
  for (let i = 0; i < film.results.length; i++) {
    poster[i].addEventListener('click', (e) => {
      window.location = 'film.html';
      const filmInfo = film.results[i];
      // console.log(filmInfo);
      localStorage.setItem('film', JSON.stringify(filmInfo));
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
// window.addEventListener('click', (e) => {
//   console.log(user);
// });
