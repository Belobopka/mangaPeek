export const actionTypes = {
    SET_MANGA_LIST: 'SET_MANGA_LIST',
    SET_MANGA_GENRES: 'SET_MANGA_GENRES',
    SET_GENRE_CHECKBOX: 'SET_GENRE_CHECKBOX',
    SET_CHAPTERS_LIST: 'SET_CHAPTERS_LIST',
    SET_LOADING_STATE: 'SET_LOADING_STATE',
    SAVE_CHAPTER_IMAGES: 'SAVE_CHAPTER_IMAGES',
    CHANGE_MODULE_NAME: 'CHANGE_MODULE_NAME',
    SET_LOADING_CHAPTER: 'SET_LOADING_CHAPTER',
    SET_ERROR: 'SET_ERROR',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_PROGRESS_BAR: 'SET_PROGRESS_BAR',
    SET_IMAGE_COUNT: 'SET_IMAGE_COUNT',
    SET_MANGA_INFO: 'SET_MANGA_INFO',
};

export const setError = (err) => {
    return {
        type: actionTypes.SET_ERROR,
        payload: { err },
    };
};

export const setMangaGenres = (mangaGenres) => {
    return {
        type: actionTypes.SET_MANGA_GENRES,
        payload: { mangaGenres },
    };
};

export const setLoadingState = (isLoading, name) => {
    return {
        type: actionTypes.SET_LOADING_STATE,
        payload: { isLoading, name },
    };
};

export const setMangaList = (list) => {
    return {
        type: actionTypes.SET_MANGA_LIST,
        payload: { list },
    };
};

export const saveChapterImages = (imagesArray, index, preload) => {
    return {
        type: actionTypes.SAVE_CHAPTER_IMAGES,
        payload: { imagesArray, index, preload },
    };
};

export const setMangaChapter = (chapterPromise, preload) => {
    return {
        type: actionTypes.SET_LOADING_CHAPTER,
        payload: { chapterPromise, preload },
    };
};

export const setMangaChaptersList = (mangaChaptersList) => {
    return {
        type: actionTypes.SET_CHAPTERS_LIST,
        payload: { mangaChaptersList },
    };
};

export const setCategory = (moduleName, list, category) => {
    return {
        type: actionTypes.SET_CATEGORY,
        payload: { moduleName, list, category },
    };
};

export const rejectChapterLoad = () => {
    return (dispatch, getState) => {
        const { appReducer: { chapterPromise, preloadChapterPromise } } = getState();
        if (chapterPromise) {
            chapterPromise.cancel('Rejected by exit from the chapter reader');
            dispatch(setMangaChapter(null));
        }
        if (preloadChapterPromise) {
            preloadChapterPromise.cancel('Rejected preloadChapterPromise by exit from the chapter reader');
            dispatch(setMangaChapter(null, true));
        }
    }; 
};

export const setImageCount = (imageCount) => {
    return {
        type: actionTypes.SET_IMAGE_COUNT,
        payload: { imageCount },
    };
};

export const setBarProgress = (progress) => {
    return {
        type: actionTypes.SET_PROGRESS_BAR,
        payload: { progress },
    };
};

export const setMangaInfo = (mangaInfo) => {
    return {
        type: actionTypes.SET_MANGA_INFO,
        payload: { mangaInfo },
    };
};