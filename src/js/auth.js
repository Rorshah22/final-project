import { users } from './base';
window.addEventListener('click', (e) => {
  const auth = document.querySelector('.sign');
  const modal = document.createElement('div');
  // создать окно авторизации
  if (e.target.className === 'sign') {
    // const modal = document.createElement('div');
    modal.classList.add('modal');
    const select = document.querySelector('.galery-films');
    select.append(modal);
    modal.innerHTML = `
    <div class="modal_block">
    <button class="close-btn" type="button">close</button>
      <div>
        
        <form action="" method="get" class='modal-form'>
        <label for="mail">Enter you email</label>
        <input id="mail" type="email" placeholder="email" required>
        <label for="password">Enter you password</label>
        <input id="password" type="password" minlength="6"  placeholder="Password" required>
        <input class="btn-input" type="submit" value="Sign">
        <input class="btn-input registration" type="button" value="Registration">
        </form>
      </div>
    </div>
  `;
  }
  // удалить окно аторизации
  if (e.target.classList.contains('close-btn')) {
    document.querySelector('.modal').remove();
  }
  // console.log(e.target);
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
  // async function getUser() {
  //   const response = await fetch('../dummy_data/users.json');
  //   const users = await response.json();
  //   console.log(users);
  // }

  console.log(users);
});
