const urlParamsString = document.location.search;
const postsUrlData = new URLSearchParams(urlParamsString);
const postPage = postsUrlData.get('page');
// Получаем ID статьи
const postId = postsUrlData.get('id');
console.log(postsUrlData);

async function makePost(id) {
  // получаем с сервера статью по ID в виде объекта
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage}`);
  const data = await response.json();
  let postId = await postsUrlData.get('id');
  let postObj = await data['data'][postId];

  makeContent(postObj);
}

function makeContent(obj) {
  // на основе полученного объекта со статьёй рисуем контент
  const container = document.querySelector('.container');
  const postTitle = document.createElement('h1');
  const postDescr = document.createElement('p');

  postTitle.innerHTML = obj.title;
  postDescr.innerHTML = obj.body;

  container.append(postTitle);
  container.append(postDescr);
}

makePost(postId);
