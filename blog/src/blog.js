async function loadBlogPostsList(page) {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const data = await response.json();
  let itemsArr = data['data'];
  let postCount = 0;

  for (let elem of itemsArr) {
    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');

    blogItemLink.innerHTML = elem.title;
    blogItemLink.setAttribute('href', `post.html?page=${page}&&id=${postCount}`);
    blogItem.append(blogItemLink);
    blogUl.append(blogItem);
    postCount++;
  }
}

const blogContainer = document.querySelector('.container');
const blogUl = document.createElement('ul');
blogContainer.append(blogUl);

loadBlogPostsList(1)
