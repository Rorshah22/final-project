let user = JSON.parse(localStorage.getItem('user'));
export function getUser() {
  if (user === null || user === '') {
    document.querySelector('.user-name').textContent = ``;
  } else {
    document.querySelector('.user-name').textContent = `${user.name}`;
    const logOut = document.querySelector('.sign');
    logOut.textContent = 'Log Out';
    logOut.addEventListener('click', (e) => {
      e.preventDefault();
      user = '';
      localStorage.setItem('user', JSON.stringify(user));
      window.location = 'index.html';
    });
    setTimeout(() => deleteFilm(), 500);
  }
}

function deleteFilm() {
  if (user.role === 'admin') {
    console.log('hi admin');
    const buttonAddFilm = document.createElement('button');
    buttonAddFilm.classList.add('btn-add');

    document.querySelector('main').append(buttonAddFilm);
    const cardFilms = document.querySelectorAll('.card-film');
    // cardFilms.append(buttonDelFilm);
    for (let i = 0; i < cardFilms.length; i++) {
      const buttonDelFilm = document.createElement('button');
      buttonDelFilm.classList.add('btn-del');
      const element = cardFilms[i];
      element.append(buttonDelFilm);
      buttonDelFilm.addEventListener('click', (e) => {
        e.target.closest('.card-film').remove();
      });
    }
  }
}
getUser();
