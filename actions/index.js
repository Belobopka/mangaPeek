import modules from '../modules';
import {
  setMangaChapter,
  setError,
  actionTypes,
  setBarProgress,
} from './common';


// TODO fetchHotCategoryAsync fetchReadingCategoryAsync repeating
const funcNames = {
  fetchMangaGenresAsync: 'fetchMangaGenresAsync',
  fetchMangaListAsync: 'fetchMangaListAsync',
  searchMangaAsync: 'searchMangaAsync',
  getMangaChaptersList: 'getMangaChaptersList',
  fetchCategoryAsync: 'fetchCategoryAsync',
  fetchChapter: 'fetchChapter',
  fetchHotCategoryAsync: 'fetchHotCategoryAsync',
  fetchReadingCategoryAsync: 'fetchReadingCategoryAsync',
  fetchAll: 'fetchAll',
};


// getting all of the module actions.
const modulesReducersActions = Object.values(modules).reduce((accumulator, mod) => {
  const { moduleName, actions } = mod;
  return { ...accumulator, [moduleName]: actions };
}, {});


const funcCaller = (funcName, getState, name, dispatch, ...extra) => {
  const moduleName = name || getState().appReducer.moduleName;
  if (!(name || moduleName)) {
    console.log(`need to run default parser funcCaller for func: ${funcName}`);
    return;
  }

  const moduleBlock = modulesReducersActions[moduleName];

  if (!moduleBlock) {
    console.log(`missing module: ${name}`);
    return;
  }

  const func = moduleBlock[funcName];

  if (!func) {
    console.log(`missing func: ${funcName}`);
    return;
  }

  const promisedFunc = func(...extra)(dispatch, getState);

  if (!promisedFunc) {
    return;
  }

  const isPromise = typeof promisedFunc.then === 'function';

  if (isPromise) {
    return promisedFunc.catch((err) => {
      const error = getState().appReducer.err;
      if (error) {
        return;
      }
      dispatch(setError(err));
    });
  }

  return promisedFunc;
};

export const loadingBarInitWrapper = async (func, ...props) => {
  setBarProgress(0);
  await func(props);
  setBarProgress(0);
};

export const fetchMangaGenresAsync = name => (dispatch, getState) => (funcCaller(funcNames.fetchMangaGenresAsync, getState, name, dispatch));

export const fetchCategoryAsync = (name, path, category, customParser) => (dispatch, getState) => (funcCaller(funcNames.fetchCategoryAsync, getState, name, dispatch, path, category, customParser));

export const changeModuleName = moduleName => ({
  type: actionTypes.CHANGE_MODULE_NAME,
  payload: { moduleName },
});

export const fetchMangaListAsync = (url, name) => (dispatch, getState) => funcCaller(funcNames.fetchMangaListAsync, getState, name, dispatch, url);

export const searchMangaAsync = (filter, name) => (dispatch, getState) => funcCaller(funcNames.searchMangaAsync, getState, name, dispatch, filter);

export const getMangaChaptersList = (url, name) => (dispatch, getState) => funcCaller(funcNames.getMangaChaptersList, getState, name, dispatch, url);

export const setGenreCheckbox = (index, isActive) => ({
  type: actionTypes.SET_GENRE_CHECKBOX,
  payload: { index, isActive },
});

export const deleteMangaChapter = chapterPromise => ({
  type: actionTypes.DELETE_LOADING_CHAPTER,
  payload: { chapterPromise },
});


export const fetchChapter = (url, name, index, preload, withoutProgress) => (dispatch, getState) => funcCaller(funcNames.fetchChapter, getState, name, dispatch, url, index, preload, withoutProgress);

export const fetchAll = (name, mangaChaptersList) => (dispatch, getState) => funcCaller(funcNames.fetchAll, getState, name, dispatch, mangaChaptersList);

export const rejectChapterLoad = () => (dispatch, getState) => {
  const { appReducer: { chapterPromise, preloadChapterPromise } } = getState();
  console.log('chapter_rejectChapterLoad', chapterPromise);
  if (chapterPromise) {
    chapterPromise.cancel('Rejected by exit from the chapter reader');
    dispatch(setMangaChapter(null));
  }
  console.log('preload_rejectChapterLoad', preloadChapterPromise);
  if (preloadChapterPromise) {
    preloadChapterPromise.cancel('Rejected preloadChapterPromise by exit from the chapter reader');
    dispatch(setMangaChapter(null, true));
  }
};
