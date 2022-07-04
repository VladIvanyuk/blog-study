let paramsString = document.location.search;
let postData = new URLSearchParams(paramsString);
let postPage = postData.get('page');
let postId = postData.get('id');

async function makePost(id) {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage}`);
  const data = await response.json();
  let postId = await postData.get('id');
  let postDescr = await data['data'][postId];

  makeContent(postDescr);

}

function makeContent(obj) {
  const container = document.querySelector('.container');
  const postTitle = document.createElement('h1');
  const postDescr = document.createElement('p');

  postTitle.innerHTML = obj.title;
  postDescr.innerHTML = obj.body;

  container.append(postTitle);
  container.append(postDescr);
}

makePost(postId);
