const urlParamsString = document.location.search;
const postsUrlData = new URLSearchParams(urlParamsString);
const postPage = postsUrlData.get('page');

const blogContainer = document.querySelector('.container');
const blogUl = document.createElement('ul')

async function loadBlogPostsList(page = 1) {

  if(urlParamsString === '?page=1') {
    window.location.assign('index.html')
  }

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

    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');

    blogContainer.append(blogUl)
    blogItemLink.innerHTML = elem.title;
    blogItemLink.setAttribute('href', `post.html?page=${page}&id=${postCount}`);
    blogItem.append(blogItemLink);
    blogUl.append(blogItem);
    postCount++;
  }

  const changePageInput = document.createElement('input');
  const changePageLink = document.createElement('a');
  changePageLink.innerHTML = 'Сменить страницу';

  changePageInput.addEventListener('input', () => {
    changePageLink.setAttribute('href', `index.html?page=${changePageInput.value}`)
  })

  blogContainer.append(changePageInput, changePageLink);
}



loadBlogPostsList(postPage)
