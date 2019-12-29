const URLS = [
  {
    name: '📺',
    url: 'https://vidsrc.me/embed/'
  },
  {
    name: '🖥',
    url: 'https://ww1.putlockers.movie/embed/'
  }
];

const WORKING_URL = 'https://www.imdb.com/title/';
const CURRENT_URL = document.location.href;
const REGEX = new RegExp(WORKING_URL);
const MOVIE_NAME_ELEMENT = document.querySelector('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1');

const getIMDbID = () => {
  let id = '';
  if (REGEX.test(CURRENT_URL)) {
    id = CURRENT_URL.split(WORKING_URL)[1];
    id = id.split('/')[0];
  }
  return id;
};

const createUrlWatcher = () => {
  const MOVIE_ID = getIMDbID();
  const divWrapper = document.createElement('div');
  divWrapper.classList.add('subtext');
  divWrapper.style.textAlign = 'center';

  URLS.forEach((_url, i) => {
    const a = document.createElement('a');
    a.href = `${_url.url}${MOVIE_ID}/`;
    a.target = '__blank';
    a.innerText = _url.name;
    a.style.textDecoration = 'none';
    a.style.margin = '0 10px';
    a.title = `External link ${i + 1}`;
    divWrapper.appendChild(a);
  });
  MOVIE_NAME_ELEMENT.appendChild(divWrapper);
};

chrome.extension.sendMessage({}, (response) => {
  createUrlWatcher();
});
