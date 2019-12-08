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
    hotCategories: {},
    readingNowCategories: {},
    recommendedCategories: {},
    mangaInfo: null,
};
export default initState;
