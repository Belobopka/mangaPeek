/*
  change redux logic https://rangle.slides.com/yazanalaboudi/deck#/2
  split redux logic to some independent blocks
  use selectors
*/

/* Load on failed image */

// TODO add Reselect

export const initState = {
  mangaData: null,
  mangaList: {
    isLoading: true,
    list: null,
  },
  mangaGenres: null,
  mangaChapters: { isLoading: true, mangaChaptersList: null },
  isLoading: false,
  imagesInfo: {
    err: false,
    isLoading: true,
    imagesArray: { list: [], index: null, isLoading: true },
    progressBar: null,
    imageCount: null,
  },
  imagesInfoPreload: {
    err: false,
    isLoading: true,
    imagesArray: { list: [], index: null, isLoading: true },
    progressBar: null,
    imageCount: null,
  },
  filter: {
    filterUrl: null,
  },
  chapterPromise: null,
  preloadChapterPromise: null,
  moduleName: 'mangaFox',
  // merge Categories, make multiple blocks like hotCategory: [block1, bloc2 ... blockn]
  hotCategories: {},
  readingNowCategories: {},
  recommendedCategories: {},
  mangaInfo: null,
};

export default initState;
