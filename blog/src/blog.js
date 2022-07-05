async function loadBlogPostsList(page) {
  // Получаем массив статей и на его основе рисуем список статей на странице
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const data = await response.json();
  const postsArray = data['data'];

  makePostsList(postsArray, page);
}

// Создаем список статей и присваиваем им урлы на основе страницы и номера статьи
function makePostsList(object, page) {
  // Счётчик номера статьи
  let postCount = 0;

  for (let elem of object) {
    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');

    blogItemLink.innerHTML = elem.title;
    blogItemLink.setAttribute('href', `post.html?page=${page}&&id=${postCount}`);
    blogItem.append(blogItemLink);
    blogUl.append(blogItem);
    postCount++;
  }
}

  // создаём форму для переключения страниц со статьями
function createPageChangeForm(container) {

  const changeForm = document.createElement('form');
  const pageNumInput = document.createElement('input');
  const changePageBtn = document.createElement('button');

  changeForm.classList.add('form');
  changePageBtn.classList.add('btn');
  changePageBtn.innerHTML = 'Сменить страницу';

  container.append(changeForm);
  changeForm.append(pageNumInput);
  changeForm.append(changePageBtn);
}

const blogContainer = document.querySelector('.container');
const blogUl = document.createElement('ul');
blogContainer.append(blogUl);

loadBlogPostsList(2)
createPageChangeForm(blogContainer);
