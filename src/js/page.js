const paginator = document.querySelector('.paginator');
let count = 50;
let beginPage = 5;
let countPage = Math.ceil(count / beginPage);
let page = '';
for (let i = 0; i < countPage; i++) {
  page +=
    "<button class='btn-page' data-page=" +
    i * beginPage +
    '  id="page' +
    (i + 1) +
    '">' +
    (i + 1) +
    '</button>';
}
paginator.innerHTML = page;
