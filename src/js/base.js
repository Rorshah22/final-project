async function getBase(url) {
  const response = await fetch(url);
  const film = await response.json();

  const galery = document.querySelector('.galery-films');
  galery.innerHTML = '';
  function creatCardFilm(i) {
    galery.innerHTML += `<div class="card-film">
		<figure>
		<img src="https://image.tmdb.org/t/p/w300${film.results[i].poster_path}" alt="">
		<figcaption>${film.results[i].title}</figcaption>
		</figure>
		</div>`;
  }

  for (let i = 0; i < film.results.length; i++) {
    creatCardFilm(i);
  }
}

const url =
  'https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
getBase(url);

const home = document.querySelector('.home-page');
home.addEventListener('click', (e) => {
  getBase(url);
});

import { pageNumbers, PaginationButton } from './page';

const paginationButtons = new PaginationButton(15, 5);

paginationButtons.render();

paginationButtons.onChange((e) => {
  // if (condition) {
  // }
  getBase(
    `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${e.target.value}`,
  );
});
