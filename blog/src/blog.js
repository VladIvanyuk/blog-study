async function loadBlogPostsList(page) {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=10`);
  const data = await response.json();
  let itemsArr = data['data'];

  for (let elem of itemsArr) {
    const blogItem = document.createElement('li');
    const blogItemLink = document.createElement('a');
    blogItemLink.innerHTML = elem.title;
    blogItem.append(blogItemLink);
    blogUl.append(blogItem);
  }
}

const blogContainer = document.querySelector('.container');
const blogUl = document.createElement('ul');
blogContainer.append(blogUl);

loadBlogPostsList(4)
