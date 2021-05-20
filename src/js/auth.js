import '../scss/app.scss';
// запрос пользователей
import { users } from './user';
window.store = users;

const signUp = document.querySelector('.signup');
signUp.addEventListener('click', (e) => {
  e.preventDefault();

  let mail = document.querySelector('#mail').value;
  let pass = document.querySelector('#password').value;

  for (let i = 0; i < store.length; i++) {
    if (store[i].email === mail && store[i].password === pass) {
      window.location = 'index.html';
      const user = {
        name: store[i].name,
        mail: mail,
        password: pass,
        role: store[i].role,
      };

      localStorage.setItem('user', JSON.stringify(user));
    }
  }
});

// создать окно авторизации
const registration = document.querySelector('.registration');
registration.addEventListener('click', (e) => {
  //регистрация. сохраняем пользователя
  if (e.target.classList.contains('registration')) {
    document.querySelector('.modal-form').innerHTML = `
      <form action="" method="get" class='modal-form'>
      <label for="name">Enter you name</label>
      <input id="user_name" type="name" minlength="6" placeholder="Name" required>
      <label for="surname">Enter you surname</label>
      <input id="user_surname" type="name" minlength="6" placeholder="Surname" required>
      <label for="password">Enter you password</label>
      <input id="password" type="password" minlength="5"  placeholder="Password" required>
      <label for="password">Confirm password</label>
      <input id="confirm_password" type="password" minlength="5"  placeholder="Confirm password" required>
      <span class='confirm'></span>
      <label for="mail">Enter you email</label>
      <input id="mail" type="email" placeholder="email" required>
      <input id="submit" class="btn-input" type="submit" value="Sing Up">
      <input class="btn-input" type="reset" value="Clear">
      </form>`;

    // проверка паролей
    const pass = document.getElementById('password');
    const confPass = document.getElementById('confirm_password');
    const conf = document.querySelector('.confirm');
    confPass.oninput = () => {
      if (pass.value !== confPass.value) {
        conf.textContent = 'not confirm';
      } else {
        conf.textContent = '';
      }
    };
  }

  console.log(users);
});
