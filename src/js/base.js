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
      galery.innerHTML = 'hi!';
      buttons.classList.add('hidden');
      // https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=1b06c9389ebebe29b5b43bc4607a5dec
      console.log(
        'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=1b06c9389ebebe29b5b43bc4607a5dec',
      );
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
    select.value = 'none';
  });
}
//импортируем рендер кнопок пангинации
import { pageNumbers, PaginationButton } from './page';
const paginationButtons = new PaginationButton(15, 5);
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
  if (select.value === 'none' || select.value === 'rating_dec') {
    return (url = `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=100`);
  }
  if (select.value === 'rating_asc') {
    return (url = `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=${page}&vote_count.gte=100`);
  }
  if (select.value === 'release_date_des') {
    return (url = `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=100`);
  }
  if (select.value === 'release_date_asc') {
    return (url = `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=${page}&vote_count.gte=100`);
  }
}

getBase(myUrl());
