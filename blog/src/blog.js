async function loadBlogPostsList(page = 1) {
  // Получаем массив статей и на его основе рисуем список статей на странице
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const data = await response.json();
  const postsArray = await data['data'];

  makePostsList(postsArray, page);
}

// Создаем список статей и присваиваем им урлы на основе страницы и номера статьи
function makePostsList(object, page) {
  // Счётчик номера статьи
  let postCount = 0;

  for (let elem of object) {

    const blogUl = document.querySelector('ul')
    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');

    blogItemLink.innerHTML = elem.title;
    blogItemLink.setAttribute('href', `post.html?page=${page}&id=${postCount}`);
    blogItem.append(blogItemLink);
    blogUl.append(blogItem);
    postCount++;
  }
}

// создаём форму для переключения страниц со статьями
function createPageChangeForm(container) {

  const containerBlock = document.querySelector('.container')

  const contentBlock = document.createElement('div');
  const changeForm = document.createElement('form');
  const pageNumInput = document.createElement('input');
  const changePageBtn = document.createElement('button');
  const formTitle = document.createElement('p');
  const blogUl = document.createElement('ul');

  contentBlock.classList.add('block');
  changeForm.classList.add('form');
  changePageBtn.classList.add('btn');
  pageNumInput.classList.add('input');
  changePageBtn.innerHTML = 'Сменить страницу';
  formTitle.innerHTML = 'Введите '

  container.append(contentBlock);
  contentBlock.append(blogUl);
  contentBlock.append(changeForm);
  changeForm.append(pageNumInput);
  changeForm.append(changePageBtn);

  changeForm.addEventListener('submit', async function (e) {
    // по клику на кнопку переходи на страницу, с номером из инпута
    e.preventDefault();

    const ul = document.querySelector('ul');
    const pageNumValue = document.querySelector('input');
    const page = pageNumValue.value;


    loadBlogPostsList(page);
  })
}

const blogContainer = document.querySelector('.container');

createPageChangeForm(blogContainer);


