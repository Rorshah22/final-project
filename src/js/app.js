import '../scss/app.scss';

/* Your JS Code goes here */
import 'regenerator-runtime/runtime';
// import './page';
import './base';
// import './auth';

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};
