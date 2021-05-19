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
    addFilm();
  }
}

function deleteFilm() {
  if (user.role === 'admin') {
    const cardFilms = document.querySelectorAll('.card-film');

    for (let i = 0; i < cardFilms.length; i++) {
      const buttonDelFilm = document.createElement('button');
      buttonDelFilm.classList.add('btn-del');
      const element = cardFilms[i];
      element.append(buttonDelFilm);
      buttonDelFilm.addEventListener('click', (e) => {
        e.target.closest('.card-film').remove();
        console.log(`Удаление фильма id:` + e.target.closest('.card-film').dataset.id);
      });
    }
  }
}
function addFilm() {
  if (user.role === 'admin') {
    const buttonAddFilm = document.createElement('button');
    buttonAddFilm.classList.add('btn-add');
    if (document.querySelector('.section-select')) {
      document.querySelector('.section-select').append(buttonAddFilm);
      buttonAddFilm.addEventListener('click', (e) => {
        window.location = 'add-film.html';
      });
    }
  }
}

getUser();

export function location() {
  if (user === null || user.role !== 'admin') {
    window.location = 'notfound.html';
  }
}
