const urls = [
  {
    name: '📺',
    url: 'https://vidsrc.me/embed/'
  },
  {
    name: '🖥',
    url: 'https://ww1.putlockers.movie/embed/'
  }
];

const workingUrl = 'https://www.imdb.com/title/';
const currentUrl = document.location.href;
const urlRegex = new RegExp(workingUrl);
const seriesRegex = /\d+/;
const movieNameWrapper = document.querySelector('#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1');
const isSerie = !!document.querySelector('#title-episode-widget');
const serieWrapper = document.querySelector('#title-overview-widget > div.vital > div.button_panel.navigation_panel > div > div > div > div');
const serieParentRegex = /(?<=\/)[\d+\w+]+(?=\?)/;
const serieParentURL = document.querySelector('#title-overview-widget > div.vital > div.title_block > div.titleParentWrapper > div > a');

const getIMDbID = () => {
  let id = '';
  if (urlRegex.test(currentUrl)) {
    id = currentUrl.split(workingUrl)[1];
    id = id.split('/')[0];
  }
  return id;
};

const getSerieInfo = () => {
  const seriesInfo = serieWrapper?.innerText.split('|') ?? [];
  if (!seriesInfo.lenght) { return {}; }
  const [seasonInfo, chapterInfo] = seriesInfo;
  const [season] = seasonInfo.match(seriesRegex);
  const [chapter] = chapterInfo.match(seriesRegex);

  if (!season && !chapter) { return {}; }
  const [parentId] = serieParentURL?.href.match(serieParentRegex);
  return { season, chapter, parentId };
};

const createLinkScaffolding = () => {
  const link = document.createElement('a');
  link.style.textDecoration = 'none';
  link.style.margin = '0 10px';
  return link;
};

const createLinks = ({ divWrapper, movieId, serieInfo }) => {
  if (isSerie) {
    const link = Object.assign(createLinkScaffolding(), {
      href: `${workingUrl}${movieId}/episodes`,
      target: '__blank',
      innerText: 'Haz click para acceder a los episodios de la serie',
      title: 'Haz click!',
    });
    link.style.color = '#FF0000';
    link.style.fontWeight = 'bold';
    divWrapper.appendChild(link);
  } else {
    const { season, chapter, parentId } = serieInfo;
    urls.forEach((_url, i) => {
      const link = Object.assign(createLinkScaffolding(), {
        href: `${!!season && !!chapter && !!parentId ? `${_url.url}${parentId}/${season}-${chapter}/` : `${_url.url}${movieId}/`}`,
        target: '__blank',
        innerText: _url.name,
        title: `External link ${i + 1}`,
      });
      divWrapper.appendChild(link);
    });
  }
  movieNameWrapper?.appendChild(divWrapper);
};

const createUrlWatcher = () => {
  const movieId = getIMDbID();
  const serieInfo = getSerieInfo();
  const divWrapper = document.createElement('div');
  divWrapper.classList.add('subtext');
  divWrapper.style.textAlign = 'center';

  createLinks({ divWrapper, movieId, serieInfo });
};

chrome.extension.sendMessage({}, () => {
  createUrlWatcher();
});