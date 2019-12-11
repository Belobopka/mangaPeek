import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { initState as initialState } from '../store';
import AppNavigator from '../navigation/AppNavigator';
import { actionTypes } from '../actions/common';

// import modules from '../modules';

// creating object with module navigators
// currently isn't in use
// const modulesReducersObj = modules.reduce((accumulator, mod) => {
//     const { reducer, reducerName, moduleName } = mod;
//     return { ...accumulator, [reducerName || `${moduleName}Reducer`]: reducer };
// }, {});

const deepRec = (obj, deep, params, index = 0, state = {}) => {
  let newObj = obj[deep[index]];
  let editedState = { ...obj, [deep[index]]: newObj };
  if (deep.length === index + 1) {
    newObj = { ...obj[deep[index]], ...params };
    editedState = { ...obj, [deep[index]]: newObj };
    return editedState;
  }
  return deepRec(newObj, deep, params, index + 1, state);
};


const getDeep = (state, name, params) => {
  const deep = name.split('.');

  if (deep.length === 1) {
    return { ...state, [deep[0]]: { ...state[deep[0]], ...params } };
  }
  const innerObj = deepRec(state, deep, params);
  return { ...state, [deep[0]]: innerObj };
};

const initialNavigatorState = AppNavigator.router.getStateForAction(NavigationActions.init());

// TODO refactor reducer, should remove some sets, clear if conditions from state
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MANGA_LIST: {
      return { ...state, mangaList: { ...state.mangaList, isLoading: false, list: action.payload.list } };
    }
    case actionTypes.CHANGE_MODULE_NAME: {
      const { moduleName } = action.payload;
      return { ...state, moduleName };
    }
    case actionTypes.SET_MANGA_GENRES: {
      return { ...state, mangaGenres: action.payload.mangaGenres };
    }
    case actionTypes.SET_LOADING_STATE: {
      const { isLoading, name } = action.payload;
      return getDeep(state, name, { isLoading, err: false });
    }
    case actionTypes.SET_GENRE_CHECKBOX: {
      const { index, isActive } = action.payload;
      if (state.mangaGenres && state.mangaGenres[index]) {
        return {
          ...state,
          mangaGenres: state.mangaGenres.map((item, arrayIndex) => {
            if (arrayIndex === index) {
              return { ...item, isActive };
            }
            return item;
          }),
        };
      }
      return state;
    }
    case actionTypes.SET_LOADING_CHAPTER: {
      const { chapterPromise, preload } = action.payload;
      return { ...state, [preload ? 'preloadChapterPromise' : 'chapterPromise']: chapterPromise };
    }
    case actionTypes.SET_CHAPTERS_LIST: {
      const { mangaChaptersList } = action.payload;
      return { ...state, mangaChapters: { mangaChaptersList, isLoading: false } };
    }
    case actionTypes.SAVE_CHAPTER_IMAGES: {
      const {
        imagesArray, imagesArray: { err }, index, preload,
      } = action.payload;
      const infoName = `imagesInfo${preload ? 'Preload' : ''}`;
      return err ? { ...state, [infoName]: { ...state[infoName], err } } : {
        ...state,
        [infoName]: {
          ...state[infoName],
          imagesArray: { list: imagesArray, index, isLoading: false },
          err: false,
        },
      };
    }
    case actionTypes.SET_HOT_CATEGORY: {
      const { moduleName, hotInfo } = action.payload;
      return { ...state, hotCategories: { ...state.hotCategories, [moduleName]: hotInfo } };
    }
    case actionTypes.SET_CATEGORY: {
      const { moduleName, list, category } = action.payload;
      return { ...state, [category]: { ...state[category], [moduleName]: list } };
    }
    case actionTypes.SET_READING_CATEGORY: {
      const { moduleName, readingInfo } = action.payload;
      return { ...state, readingNowCategories: { ...state.readingNowCategories, [moduleName]: readingInfo } };
    }
    case actionTypes.SET_ERROR: {
      const { err } = action.payload;
      return { ...state, err };
    }
    case actionTypes.SET_IMAGE_COUNT: {
      const { imageCount } = action.payload;
      return imageCount ? { ...state, imagesInfo: { ...state.imagesInfo, imageCount } } : state;
    }
    case actionTypes.SET_PROGRESS_BAR: {
      const { progress } = action.payload;
      return state.imagesInfo.imageCount ? { ...state, imagesInfo: { ...state.imagesInfo, progressBar: progress / state.imagesInfo.imageCount } }
        : state;
    }
    case actionTypes.SET_MANGA_INFO: {
      const { mangaInfo } = action.payload;
      return { ...state, mangaInfo };
    }
    default:
      break;
  }
  return state;
};

const navReducer = (state = initialNavigatorState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const reducer = combineReducers({
  appReducer,
  nav: navReducer,
});

export default reducer;
