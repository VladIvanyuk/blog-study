const urlParamsString = document.location.search;
const postsUrlData = new URLSearchParams(urlParamsString);
const postPage = postsUrlData.get('page');
let pagesMaxCount;

const blogContainer = document.querySelector('.container');
const blogUl = document.createElement('ul')

async function loadBlogPostsList(page = 1) {
  // проверка на первую страницу
  if(urlParamsString === '?page=1') {
    window.location.assign('index.html')
  }

  // Получаем массив статей и на его основе рисуем список статей на странице
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const data = await response.json();
  const postsArray = await data['data'];
  const pagesCount = data.meta.pagination.pages;

  pagesMaxCount = await pagesCount;

  makePostsList(postsArray, page);
}

// Создаем список статей и присваиваем им урлы на основе страницы и номера статьи
function makePostsList(object, page) {
  // Счётчик номера статьи
  let postCount = 0;
  const changePageInput = document.createElement('input');
  const changePageLink = document.createElement('a');
  const changePageBlock = document.createElement('div');
  const pageNumPar = document.createElement('p');

  changePageLink.innerHTML = 'Change page';
  pageNumPar.innerHTML = `Page ${postPage === null ? 1 : postPage}`;
  changePageInput.type = 'number';
  changePageInput.placeholder = `1-${pagesMaxCount}`

  changePageBlock.classList.add('change-block')

  blogContainer.append(blogUl, changePageBlock);
  changePageBlock.append(changePageInput, changePageLink, pageNumPar);


  for (let elem of object) {
    // циклом выводим статьи
    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');

    blogItem.classList.add('post');
    blogItemLink.classList.add('post__link');

    blogItem.append(blogItemLink);
    blogUl.append(blogItem);


    blogItemLink.innerHTML = elem.title;
    blogItemLink.setAttribute('href', `post.html?page=${page === null ? 1 : page}&id=${postCount}`);

    postCount++;
  }

  changePageInput.addEventListener('input', () => {
    // проверка на номер вводимой страницы
    if (changePageInput.value > pagesMaxCount) {
      changePageInput.value = pagesMaxCount;
    } else if (changePageInput.value < 1) {
      changePageInput.value = 1;
    }

    // при вводе, добавляем то что вводим в ссылку
    changePageInput.value = changePageInput.value.trim();
    changePageLink.setAttribute('href', `index.html?page=${changePageInput.value}`)
  })

  changePageInput.addEventListener('keyup', (e) => {
    // по клику на Enter переходим по ссылке на страницу
    if (e.code === 'Enter') {
      window.location.assign(`index.html?page=${changePageInput.value}`)
    }
  })


}
loadBlogPostsList(postPage)

