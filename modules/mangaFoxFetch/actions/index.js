import { mangaPath, searchPath } from '../config/Network';
import { repeatMaxCounter, moduleName } from '../config/consts';
import {
  setMangaGenres,
  setLoadingState,
  setMangaList,
  saveChapterImages,
  setMangaChapter,
  setMangaChaptersList,
  setCategory,
  setBarProgress,
  setImageCount,
  setMangaInfo,
} from '../../../actions/common';

const imgSrcRegex = /img.+?src="(.+?)".+?<\/a>/;
const nameRegex = /title="(.*?)"><img\s/;
const linkRegex = /<a href="\/manga\/(.+?)\/"/;
const itemScoreRegex = /<span class="item-score">(\d+\.\d+)<\/span>/;

export const fetchCategoryAsync = (
  path,
  category,
  customParser,
) => async dispatch => {
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');
  let list;
  try {
    const response = await fetch(path, {
      mode: 'no-cors',
      method: 'get',
      headers: myHeaders,
    });

    const textifiedResponse = await response.text();

    if (customParser) {
      list = customParser(textifiedResponse);
    } else {
      list = textifiedResponse.split('<li').reduce((accumulator, value) => {
        const imgsrc = value.match(imgSrcRegex);
        const name = value.match(nameRegex);
        const link = value.match(linkRegex);
        const itemScore = value.match(itemScoreRegex);
        if (!imgsrc || !name) {
          return accumulator;
        }
        const block = {
          img: imgsrc && imgsrc[1],
          name: name && name[1],
          link: link && mangaPath + link[1],
          itemScore: itemScore && itemScore[1],
        };
        return [...accumulator, block];
      }, []);
    }
    dispatch(setCategory(moduleName, list, category));
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchMangaGenresAsync = callback => async dispatch => {
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');

  try {
    const response = await fetch(searchPath, {
      mode: 'no-cors',
      method: 'get',
      headers: myHeaders,
    });

    const textifiedResponse = await response.text();
    const searchBlock = textifiedResponse.match(
      /<div class="tag-box">(.+?)<\/div>/,
    );
    const genreBlocks = searchBlock && searchBlock[0].match(/<a(.+?)<\/a>/g);

    const blocks = genreBlocks.reduce((accumulator, item, index) => {
      const dataVal = item.match(/data-val="(.+?)"/);
      const name = item.match(/title="(.+?)"/);
      if (!dataVal || !name) {
        return accumulator;
      }
      const block = {
        value: dataVal && dataVal[1],
        name: name && name[1],
        isActive: false,
        index,
      };
      return [...accumulator, block];
    }, []);
    dispatch(setMangaGenres(blocks));
    if (callback) {
      callback(blocks);
    }
    dispatch(setLoadingState(false, 'mangaList'));
    return blocks;
  } catch (err) {
    dispatch(setLoadingState(false, 'mangaList'));
    console.log(err);
  }
};

export const fetchMangaListAsync = url => async dispatch => {
  dispatch(setLoadingState(true, 'mangaList'));
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');

  try {
    const response = await fetch(url, {
      mode: 'no-cors',
      method: 'get',
      headers: myHeaders,
    });

    const textifiedResponse = await response.text();
    const blocks = textifiedResponse
      .split('<li')
      .reduce((accumulator, value) => {
        const imgsrc = value.match(/img.+?src="(.+?)".+?<\/a>/);
        const name = value.match(/title="(.*?)"><img\s/);
        const link = value.match(/<a href="\/manga\/(.+?)\/"/);
        const itemScore = value.match(
          /<span class="item-score">(\d+\.\d+)<\/span>/,
        );
        if (!imgsrc || !name) {
          return accumulator;
        }
        const block = {
          img: imgsrc && imgsrc[1],
          name: name && name[1],
          link: link && mangaPath + link[1],
          itemScore: itemScore && itemScore[1],
        };
        return [...accumulator, block];
      }, []);
    dispatch(setLoadingState(false, 'mangaList'));
    return dispatch(setMangaList(blocks));
  } catch (err) {
    console.log(err);
    dispatch(setLoadingState(false, 'mangaList'));
  }
};

export const searchMangaAsync = filter => dispatch => {
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');
  return fetch(searchPath + filter, {
    mode: 'no-cors',
    method: 'get',
    headers: myHeaders,
  })
    .then(response => {
      response.text().then(text => {
        const blocks = text.split('<li').reduce((accumulator, value) => {
          const imgsrc = value.match(/img.+?src="(.+?)".+?<\/a>/);
          const name = value.match(/title="(.*?)"><img\s/);
          const link = value.match(/<a href="\/manga\/(.+?)\/"/);
          const itemScore = value.match(
            /<span class="item-score">(\d+\.\d+)<\/span>/,
          );
          if (!imgsrc || !name) {
            return accumulator;
          }
          const block = {
            img: imgsrc && imgsrc[1],
            name: name && name[1],
            link: link && mangaPath + link[1],
            itemScore: itemScore && itemScore[1],
          };
          return [...accumulator, block];
        }, []);
        return dispatch(setMangaList(blocks));
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMangaInfo = (htmlText, dispatch) => {
  const description = htmlText.match(
    /<p class="detail-info-right-content">.+?<\/p>(.|\n)*?class="fullcontent">((.|\n)*?)<\/p>/,
  );
  const genres = htmlText.match(
    /<p class="detail-info-right-tag-list">(.+?)<\/p>/,
  );
  const genresArray =
    genres[1] &&
    genres[1].split('<a').reduce((accumulator, value) => {
      const link = value.match(/href="(.+?)"/);
      const title = value.match(/title="(.+?)"/);
      if (!title || !link) {
        return accumulator;
      }

      const block = {
        link: link[0] && link[1],
        title: title[0] && title[1],
      };
      return [...accumulator, block];
    }, []);
  dispatch(
    setMangaInfo({
      description: description && description[2],
      genresArray,
    }),
  );
};

export const getMangaChaptersList = url => dispatch => {
  dispatch(setLoadingState(true, 'mangaChapters'));
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');
  // autocheck for adult manga
  myHeaders.append('Cookie', 'isAdult=1;');
  return fetch(url, {
    mode: 'no-cors',
    method: 'get',
    headers: myHeaders,
  })
    .then(response => {
      response.text().then(text => {
        try {
          getMangaInfo(text, dispatch);
          const searchBlock = text.match(
            /<ul class="detail-main-list">(.+?)<\/ul>/,
          );
          const mangaItems =
            searchBlock && searchBlock[0].match(/<li(.+?)<\/li>/g);
          const blocks = mangaItems.reduce((accumulator, value) => {
            const name = value.match(/title="(.*?)"/);
            const link = value.match(/<a href="\/manga\/(.+?.html)"/);
            if (!link || !name) {
              return accumulator;
            }
            const block = {
              name: name && name[1],
              link: link && mangaPath + link[1],
            };
            return [...accumulator, block];
          }, []);
          dispatch(setMangaChaptersList(blocks.reverse()));
        } catch (err) {
          console.log(err);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const fetchImage = ({ url, chapterUrl }) =>
  new Promise(async (resolve, reject) => {
    try {
      // eslint-disable-next-line no-undef
      const blobHeaders = new Headers();
      blobHeaders.append('Content-Type', 'text/html');
      blobHeaders.append('Referer', url);
      let blobResp = await fetch(chapterUrl, {
        mode: 'no-cors',
        method: 'GET',
        headers: blobHeaders,
      });
      if (blobResp.status !== 200) {
        let interval;
        let repeatCounter = 0;
        blobResp = await new Promise(fetchResolve => {
          let blobResponse;
          interval = setInterval(async () => {
            blobResponse = await fetch(chapterUrl, {
              mode: 'no-cors',
              method: 'GET',
              headers: blobHeaders,
            });
            repeatCounter += 1;
            // eslint-disable-next-line no-underscore-dangle
            if (
              blobResponse._bodyText.length >= 0 ||
              repeatCounter >= repeatMaxCounter
            ) {
              fetchResolve(blobResponse);
            }
          }, 500);
        });
        clearInterval(interval);
      }
      const text = await blobResp.text();
      // eslint-disable-next-line no-eval
      eval(text);
      const regex = /http:.*/;
      // eval defines d var, webpack likes to dcompress vars and we can't use d right away,
      // so i define array
      // eslint-disable-next-line no-undef
      const extraImageArray = d;
      const fixedImgArray = extraImageArray.map(imgsrc => ({
        url: imgsrc.match(regex) ? imgsrc : `http:${imgsrc}`,
      }));
      resolve(fixedImgArray);
    } catch (err) {
      reject(err);
    }
  }).catch(err => ({ err }));

const recursiveTimeoutFetchChapter = ({
  url,
  chapterId,
  changedContent,
  dispatch,
  withoutProgress = false,
}) => {
  let timeout;
  let cancel;
  let isRejected = false;
  return {
    promise: new Promise((resolve, reject) => {
      let images = [];
      cancel = reason => {
        isRejected = true;
        console.log('reason recursiveTimeoutFetchChapter', reason);
        reject(reason);
      };
      let accumulator = [];
      let page = 1;
      if (!withoutProgress) {
        dispatch(setBarProgress(page));
      }
      /* TODO implement promise multiple loading Promise.all [image, image, ...images] without delay can be blocked */
      timeout = () =>
        setTimeout(async () => {
          try {
            const chapterUrl = `${changedContent}chapterfun.ashx?cid=${
              chapterId ? chapterId[1] : ''
            }&page=${page}&key=`;
            images = await fetchImage({ url, chapterUrl });
            if (images && images.err) {
              reject(images.err);
              return;
            }
            const slicedArray = accumulator.slice(
              accumulator.length - images.length,
              accumulator.length,
            );
            const preparedImages = images.reduce((reduce, item) => {
              if (slicedArray.some(someItem => item.url === someItem.url)) {
                return reduce;
              }
              return [...reduce, item];
            }, []);

            if (images && images.length <= 1) {
              accumulator = [...accumulator, ...preparedImages];
              resolve(accumulator);
              return;
            }
            accumulator = [...accumulator, ...preparedImages];
            page += 1;
            if (isRejected) {
              return;
            }
            if (!withoutProgress) {
              dispatch(setBarProgress(page));
            }
            timeout();
          } catch (err) {
            isRejected = true;
            reject(err);
          }
        }, 100);
      timeout();
    }).catch(err => {
      isRejected = true;
      return { err };
    }),
    cancel,
  };
};

export const fetchChapter = (url, index, preload, withoutProgress = false) => (
  dispatch,
  getState,
) => {
  try {
    let cancel;
    let innerPromise;
    const {
      appReducer: {
        [preload ? 'preloadChapterPromise' : 'chapterPromise']: chapterPromise,
      },
    } = getState();
    if (chapterPromise) {
      chapterPromise.cancel('Rejected by another request');
      dispatch(setMangaChapter(null));
    }
    const chapterObject = {
      promise: new Promise(async resolve => {
        cancel = reason => {
          if (!withoutProgress) {
            dispatch(setBarProgress(0));
          }
          if (innerPromise) {
            innerPromise.cancel(reason);
          }
          dispatch(setMangaChapter(null));
          resolve(reason);
        };
        // eslint-disable-next-line no-undef
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'text/html');
        const respText = await (
          await fetch(url, {
            mode: 'no-cors',
            method: 'get',
            headers: myHeaders,
          })
        ).text();

        const chapterId = respText.match(/chapterid[\s\S]=(.*?);/);
        const content = respText.match(/meta name="og:url" content="(.*?)"/);
        const changedContent =
          content && content[1].replace('mangafox.me', 'fanfox.net');
        const imageCount = respText.match(/var imagecount=(.*?);/);
        if (!withoutProgress) {
          dispatch(setImageCount(imageCount && imageCount[1]));
        }
        innerPromise = recursiveTimeoutFetchChapter({
          url,
          chapterId,
          changedContent,
          dispatch,
          withoutProgress,
        });
        innerPromise.promise
          .then(info => {
            dispatch(setMangaChapter(null));
            if (info.err) {
              console.log('err info', info.err);
              dispatch(saveChapterImages({ err: info.err }));
              resolve(info);
              return;
            }
            if (info) {
              if (!withoutProgress) {
                dispatch(setBarProgress(0));
              }
              dispatch(saveChapterImages(info, index, preload));
              resolve(info);
            }
          })
          .catch(err => {
            console.log('catch innerPromise');
            dispatch(saveChapterImages({ err }));
          });
      }),
      cancel,
    };
    dispatch(setMangaChapter(chapterObject, preload));
  } catch (err) {
    console.log('catch fetchChapter');
    dispatch(saveChapterImages({ err }));
  }
};

export default {
  fetchMangaGenresAsync,
  fetchMangaListAsync,
  searchMangaAsync,
  fetchChapter,
  getMangaChaptersList,
  fetchCategoryAsync,
};
