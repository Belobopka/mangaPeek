// import HTMLParser from 'fast-html-parser';

import HotCategoryStyles from '../styles/HotCategory';
import { funcNames, listNames } from '../../../constants/consts';
import {
  readingNowPath, hotPath, recommendedPath, mangaPath,
} from './Network';

const mainBlockRegex = /<div\sclass="manga-list-3-show">((.|\n)*?)<div\sclass="container">/;
const imgSrcRegex = /img.+?src="(.+?)".+?<\/a>/;
const nameRegex = /title="(.*?)"><img\s/;
const linkRegex = /<a href="\/manga\/(.+?)\/"/;
const itemScoreRegex = /<span class="item-score">(\d+\.\d+)<\/span>/;


export const blocksHorizontal = [
  [{
    blockName: 'hotCategory',
    name: 'Hot Releases',
    limit: 10,
    styles: HotCategoryStyles,
    viewStyles: HotCategoryStyles.viewStyles,
    path: hotPath,
    listName: listNames.hotCategory,
  }, {
    blockName: 'readCategory',
    name: 'Reading Now',
    limit: 10,
    styles: HotCategoryStyles,
    viewStyles: HotCategoryStyles.viewStyles,
    path: readingNowPath,
    listName: listNames.readingNow,
  }],
  [{
    blockName: 'recommended',
    name: 'Recommended',
    limit: 10,
    styles: HotCategoryStyles,
    viewStyles: HotCategoryStyles.viewStyles,
    get: funcNames.getHotCategory,
    path: recommendedPath,
    listName: listNames.recommended,
    customParser: (textifiedResponse) => {
      // const root = HTMLParser.parse(textifiedResponse);
      // const main = root.querySelector('.manga-list-3');
      // const mainBlock = main.querySelector('.manga-list-3-show');
      const innerHtml = textifiedResponse.match(mainBlockRegex);
      if (!(innerHtml && innerHtml[1])) {
        console.log('innerHtml is empty');
        return [];
      }
      return innerHtml[1].split('<li').reduce((accumulator, value) => {
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
        accumulator = [...accumulator, block];
        return accumulator;
      }, []);
    },
  }],
];

export const blocksVertical = [[
  {
    blockName: 'hotCategory',
    name: 'Hot Releases',
    limit: 10,
    styles: HotCategoryStyles,
    get: funcNames.getHotCategory,
    viewStyles: HotCategoryStyles.viewStyles,
    listName: listNames.hotCategory,
  },
], [{
  blockName: 'hotCategory',
  name: 'Hot Releases',
  limit: 10,
  styles: HotCategoryStyles,
  get: funcNames.getHotCategory,
  viewStyles: HotCategoryStyles.viewStyles,
  listName: listNames.hotCategory,
}]];
