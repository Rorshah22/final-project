async function getBase(url) {
  const response = await fetch(url);
  const film = await response.json();
  const galery = document.querySelector('.galery-films');
  galery.innerHTML = '';
  function creatCardFilm(i) {
    galery.innerHTML += `<div class="card-film">
		<figure>
		<img src="https://image.tmdb.org/t/p/w200${film.results[i].poster_path}" alt="">
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

const buttonPage = document.querySelectorAll('.btn-page');
for (let i = 0; i < buttonPage.length; i++) {
  buttonPage[i].addEventListener('click', (e) => {
    getBase(
      `https://api.themoviedb.org/3/discover/movie?api_key=1b06c9389ebebe29b5b43bc4607a5dec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
        i + 1
      }`,
    );
    console.log(buttonPage[i]);
  });
}

const home = document.querySelector('.home-page');
home.addEventListener('click', (e) => {
  getBase(url);
});
