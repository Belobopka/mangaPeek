import { hotPath, novelPath, mangaUrl } from '../config/Network';
import { moduleName } from '../config/consts';
import { 
    setLoadingState, 
    setMangaList, 
    setMangaChapter, 
    setMangaChaptersList,
    setHotCategory,
    saveChapterImages,
} from '../../../actions/common';

const bodyNovel = { 
    active: null,
    count: 15,
    searchAfter: null,
    sortAsc: true,
    sortType: 'Name',
    tags: ['Chinese'],
    title: '',
};

export const fetchAll = (mangaChaptersList) => {
    return async function(dispatch, getState) {
        let accumulator = [];
        // const element = await fetchChapter(mangaChaptersList[6].link)(dispatch, getState).promise;
        // for (let index = 0; index < mangaChaptersList.length; index++) {
        //     const element = await fetchChapter(mangaChaptersList[index].link)(dispatch, getState).promise;
        //     accumulator = [...accumulator, element];
        // }
        const textBlock = await mangaChaptersList.reduce((promise, index) =>
        promise.then((result) => {
            if(result) {
                accumulator = [...accumulator, result];
            }
            return fetchChapterMultipleImplement(index.link)(dispatch, getState).promise;
        })
        , Promise.resolve());
    };
};

export const fetchHotCategoryAsync = () => {
    return async function(dispatch) {
        // eslint-disable-next-line no-undef
        const myHeaders = new Headers();
        myHeaders.append('Referer', hotPath);
        myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
        try {
            const response = await fetch(hotPath, {
                mode: 'cors',
                method: 'POST',
                credentials: 'same-origin',
                headers: myHeaders,
                body: JSON.stringify(bodyNovel),
            });
            const textifiedResponse = await response.json();

            const itemsBlock = textifiedResponse.items.map((item) => {
                const name = item.name;
                const link = novelPath + item.slug;
                const img = item.coverUrl;
                return { name, link, img };
            });
            dispatch(setHotCategory(moduleName, itemsBlock));
        }
        catch (err) {
            console.log(err);
        }
    };
};

export const fetchMangaGenresAsync = (callback) => {
    return async function(dispatch) {
        // eslint-disable-next-line no-undef
        // const myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'text/html');

        // try {
        //     const response = await fetch(searchPath, {
        //         mode: 'no-cors',
        //         method: 'get',
        //         headers: myHeaders
        //     });

        //     const textifiedResponse = await response.text();
        //     const searchBlock = textifiedResponse.match(/<div class="tag-box">(.+?)<\/div>/);
        //     const genreBlocks = searchBlock && searchBlock[0].match(/<a(.+?)<\/a>/g);

        //     const blocks = genreBlocks.reduce((accumulator, item, index) => {
        //         const dataVal = item.match(/data-val="(.+?)"/);
        //         const name = item.match(/title="(.+?)"/);
        //         if (!dataVal || !name ) {
        //             return accumulator;
        //         }
        //         const block = { 
        //             value: dataVal && dataVal[1],
        //             name: name && name[1],
        //             isActive: false, 
        //             index,
        //         };
        //         accumulator = [...accumulator, block];
        //         return accumulator;
        //     }, []);
        //     dispatch(setMangaGenres(blocks));
        //     if (callback) {
        //         callback(blocks);
        //     }
        //     dispatch(setLoadingState(false, 'mangaList'));
        //     return blocks;
        // }
        // catch (err) {
        //     dispatch(setLoadingState(false, 'mangaList'));
        //     console.log(err);
        // }
    };
};

export const fetchMangaListAsync = (url) => {
    return async function(dispatch) {
        dispatch(setLoadingState(true, 'mangaList'));
        // eslint-disable-next-line no-undef
        const myHeaders = new Headers();
        // myHeaders.append('Referer', hotPath);
        myHeaders.append('Content-Type', 'application/json;charset=UTF-8');
        try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'POST',
                credentials: 'same-origin',
                headers: myHeaders,
                body: JSON.stringify(bodyNovel),
            });
            const textifiedResponse = await response.json();

            const itemsBlock = textifiedResponse.items.map((item) => {
                const name = item.name;
                const link = novelPath + item.slug;
                const img = item.coverUrl;
                return { name, link, img };
            });
            // dispatch(setLoadingState(false, 'mangaList'));
            return dispatch(setMangaList(itemsBlock));
        }
        catch (err) {
            console.log(err);
            dispatch(setLoadingState(false, 'mangaList'));
        }
    };
};

export const getMangaChaptersList = (url) => {
    return async (dispatch) => {
        dispatch(setLoadingState(true, 'mangaChapters'));
        // eslint-disable-next-line no-undef
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'text/html');

        try {
            const response = await fetch(url, {
                mode: 'no-cors',
                method: 'get',
                credentials: 'same-origin',
                headers: myHeaders,
            });
            const textifiedResponse = await response.text();

            const blocks = textifiedResponse.split('<li').reduce((accumulator, value) => {
                const link = value.match(/<a href="(.+?)">/);
                const name = value.match(/span>(.*?)<\/span>/);

                if (!link || !name ) {
                    return accumulator;
                }

                const block = {
                    name: name && name[1],
                    link: link && mangaUrl + link[1], 
                };
                accumulator = [...accumulator, block];
                return accumulator;
            }, []);
            dispatch(setLoadingState(false, 'mangaList'));
            return dispatch(setMangaChaptersList(blocks));
        }
        catch (err) {
            console.log(err);
            dispatch(setLoadingState(false, 'mangaList'));
        }
    };
};

export const fetchChapterMultipleImplement = (url) => {
    return (dispatch) => {
        let cancel;
        const chapterObject = { promise: new Promise(async (resolve) => {
            cancel = (reason) => {
                console.log('cancel is triggered');
                resolve(reason);
            };
            // eslint-disable-next-line no-undef
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/html');
            const respText = await (await fetch(url,{
                mode: 'no-cors',
                method: 'get',
                headers: myHeaders
            })).text();

            // const fullText = respText.match(/<div\sclass="fr-view">\n(.+?)<span class="footnote"/);
            const matchedTextArray = respText.match(/<div\sclass="fr-view">((.|\n)*?)<\/div>/);



            const matchedText = matchedTextArray ? matchedTextArray[1] : false;

            if (matchedText) {
                const textArray = matchedText.replace(/<p>/g, '\n').replace(/<\/p>/g, '');
                resolve(textArray);
            }
            resolve('matchedText in fetchChapter is empty');
            return;
        }), cancel};
        dispatch(setMangaChapter(chapterObject));
        return chapterObject;
    };
};


export const fetchChapter = (url) => {
    return (dispatch, getState) => {
        let cancel;
        let { appReducer: { chapterPromise } } = getState();
        if (chapterPromise) {
            chapterPromise.cancel('Rejected by another request');
            dispatch(setMangaChapter(null));
        }
        const chapterObject = { promise: new Promise(async (resolve) => {
            cancel = (reason) => {
                dispatch(setMangaChapter(null));
                console.log('cancel is triggered');
                resolve(reason);
            };
            // eslint-disable-next-line no-undef
            const myHeaders = new Headers();
            dispatch(setLoadingState(true, 'imagesInfo'));
            myHeaders.append('Content-Type', 'text/html');
            const respText = await (await fetch(url,{
                mode: 'no-cors',
                method: 'get',
                headers: myHeaders
            })).text();

            // const fullText = respText.match(/<div\sclass="fr-view">\n(.+?)<span class="footnote"/);
            const matchedTextArray = respText.match(/<div\sclass="fr-view">((.|\n)*?)<\/div>/);



            const matchedText = matchedTextArray ? matchedTextArray[1] : false;

            if (matchedText) {
                const textArray = matchedText.replace(/<p>/g, '\n').replace(/<\/p>/g, '');
                // console.log(textArray);
                // dispatch(setLoadingState(false, 'imagesInfo'));
                dispatch(setMangaChapter(null));
                dispatch(saveChapterImages(textArray));
                resolve(textArray);
            }
            resolve('matchedText in fetchChapter is empty');
            return;
        }), cancel};
        dispatch(setMangaChapter(chapterObject));
        return chapterObject;
    };
};

export default { 
    fetchMangaGenresAsync, 
    fetchMangaListAsync, 
    fetchHotCategoryAsync,
    fetchChapter, 
    getMangaChaptersList,
    fetchAll,
};