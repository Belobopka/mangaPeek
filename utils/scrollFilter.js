export const singleGenreFilterTemplate = (page, genre) =>
  `${
    page > 1 ? `page=${page}&` : ''
  }title=&genres=${genre}&nogenres=&sort=&stype=1&name=&type=0&author_method=cw&author=&artist_method=cw&artist=&rating_method=eq&rating=&released_method=eq&released=&st=0`;
export const multipleGenreFilterTemplate = (page, genres) =>
  `${
    page > 1 ? `page=${page}&` : ''
  }title=&genres=${genres}&st=0&sort=&stype=1&name_method=cw&name=&author_method=cw&author=&artist_method=cw&artist=&type=&rating_method=eq&rating=&released_method=eq&released=`;

const testTemplate = {
  page: 'page=',
  title: 'title=',
  genres: 'genres=',
  additionalGenres: '2C',
};

// TODO clear filter mess in store;
export default class ScrollFilter {
  constructor(mangaDirectoryUrl, searchPath) {
    this.mangaDirectoryUrl = mangaDirectoryUrl;
    this.searchPath = searchPath;
    this.filter = {
      genres: [],
      page: 1,
      template: testTemplate,
      isActive: true,
    };
  }

  addGenre = genre => {
    this.filter.genres = [...this.filter.genres, genre];
  };

  getGenres = () => this.filter.genres;

  removeGenre = genre => {
    this.filter.genres = this.filter.genres.filter(
      item => item.value !== genre.value,
    );
  };

  resetFilter = () => {
    this.filter = {
      genres: [],
      page: 1,
      template: testTemplate,
      isActive: true,
    };
  };

  setPage = pageIndex => {
    this.filter = { ...this.filter, page: pageIndex };
  };

  nextPage = () => {
    this.filter = { ...this.filter, page: this.filter.page + 1 };
  };

  prevPage = () => {
    if (this.filter.page < 2) {
      return;
    }
    this.filter = { ...this.filter, page: this.filter.page - 1 };
  };

  correctFilterGenreCount = genres => {
    if (genres.length > 1) {
      const convertedGenres = genres.reduce((accumulator, item, index) => {
        let editedAccumulator;
        if (index === 0) {
          editedAccumulator = `${accumulator}${item.value}%`;
          return accumulator;
        }
        editedAccumulator = `${accumulator}2C${item.value}%`;
        return editedAccumulator;
      }, '');
      return convertedGenres;
    }
    if (genres.length === 1) {
      return genres[0].value;
    }
    return '';
  };

  getFilterString = currentPage => {
    if (currentPage) {
      this.setPage(currentPage);
    }
    // TODO revamp filters
    // const {
    //   filter: { genres, template, page },
    // } = this;
    return this.searchPath;
  };
}
