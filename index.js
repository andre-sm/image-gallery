const gallery = document.querySelector('.gallery'),
      searchForm = document.querySelector('.header__search'),
      searchInput = document.querySelector('.search__input'),
      moreBtn = document.querySelector('.btn-more'),
      removeBtn = document.querySelector('.btn-remove'),
      toTopBtn = document.querySelector('.btn-to-top');

const apiKey = '8toMHrlj-tMyqOyM2u-JVX44PwRzN_b09v2Bheg_vUs';
const perPage = 9;
let page = 1;
const mainUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=${perPage}`;
const randomUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${perPage}`;
let userUrl = '';


// Fetch random photo

getInitialData(randomUrl);

async function getInitialData(url) {
  const res = await fetch(url);
  const data = await res.json();

  displayPhotos(data);
}

// Featch search photo

searchForm.addEventListener('submit', inputHandler);

function inputHandler(e) {
  e.preventDefault();
  page = 1
  const searchValue = searchInput.value.trim();
  let searchUrl = `${mainUrl}&query=${searchValue}`;
  userUrl = searchUrl;
  if(searchInput.value !== '') {
    getSearchPhotos(searchUrl, page, true);
    searchUrl = '';
  }
}

async function getSearchPhotos(url, page, clear) {
  url = `${url}&page=${page}`
  const res = await fetch(url);
  const data = await res.json();
  if(clear) {
    gallery.innerHTML = '';
  }
  if(data.results.length === 0) {
    showErrorMessage();
    moreBtn.style.display = 'none';
  } else {
    displayPhotos(data.results, true);
  }
}

function showErrorMessage() {
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerText = 'No images found...';
  gallery.append(message);
}

// Get more images

moreBtn.addEventListener('click', getMorePhotos);

function getMorePhotos() {
  page++;
  getSearchPhotos(userUrl, page);
}

// Display photos

function displayPhotos(arr, btnSearch) {
  arr.forEach((elem, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('image-wrapper');
    const img = document.createElement('img');
    img.classList.add('image');
    img.src = elem.urls.regular;
    img.alt = `image ${index + 1}`;
    wrapper.append(img);
    gallery.append(wrapper);
  });
  if(btnSearch) {
    moreBtn.style.display = 'block';
  }
}

// Display to top button
window.addEventListener('scroll', displayToTopButton);

function displayToTopButton() {
  if (document.documentElement.scrollTop > 50) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
  }
}

toTopBtn.addEventListener('click', scrollToTop);

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // Self-rating
  
  console.log(
    'Вёрстка +10 \n',
    'При загрузке приложения на странице отображаются полученные от API изображения +10 \n',
    'Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10 \n',
    'Поиск +30 \n',
    'Дополнительный функционал: \n',
    'кнопка "Get more" для подгрузки дополнительных результатов \n',
    'если ввести бессмысленный запрос, появляется сообщение "No images found..." \n',
    'при скроле вниз появляется кнопка для прокрутки вверх (внизу справа) \n'
    );