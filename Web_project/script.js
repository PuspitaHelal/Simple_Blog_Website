document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const posts = Array.from(document.querySelectorAll('.post'));
  const paginationContainer = document.getElementById('pagination');
  const POSTS_PER_PAGE = 3;
  let currentPage = 1;
  let filteredPosts = [...posts];

  function displayPosts(postsArray, page) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    posts.forEach(post => post.style.display = 'none');
    postsArray.slice(start, end).forEach(post => post.style.display = 'flex');

    updatePagination(postsArray.length, page);
  }

  function updatePagination(totalPosts, page) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = i === page ? 'active-page' : '';
      btn.addEventListener('click', () => {
        currentPage = i;
        displayPosts(filteredPosts, currentPage);
      });
      paginationContainer.appendChild(btn);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', () => {
      const term = searchInput.value.toLowerCase();
      filteredPosts = posts.filter(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const desc = post.querySelector('p').textContent.toLowerCase();
        return title.includes(term) || desc.includes(term);
      });
      currentPage = 1;
      displayPosts(filteredPosts, currentPage);
    });
  }

  displayPosts(filteredPosts, currentPage);
});
