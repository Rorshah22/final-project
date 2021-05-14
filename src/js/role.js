let user = JSON.parse(localStorage.getItem('user'));
if (user.name !== null) {
  document.querySelector('.user-name').textContent = `${user.name}`;
  const logOut = document.querySelector('.sign');
  logOut.textContent = 'Log Out';
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    user = null;
    localStorage.setItem('user', JSON.stringify(user));
    window.location = 'index.html';
  });
}
