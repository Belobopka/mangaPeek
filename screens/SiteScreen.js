/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  CheckBox,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {
  fetchMangaListAsync,
  fetchMangaGenresAsync,
  searchMangaAsync,
  setGenreCheckbox,
  changeModuleName,
} from '../actions';
import rightArrow from '../assets/images/right_arrow.png';
import { screenNames } from '../constants/consts';
import Filter from '../utils/filter';
import ScrollingFilter from '../utils/scrollFilter';

import styles from './styles/Main';

class Site extends React.Component {
    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
      getMangaList: PropTypes.func.isRequired,
      store: PropTypes.shape({}).isRequired,
      changeGenreCheckbox: PropTypes.func.isRequired,
      changeModule: PropTypes.func.isRequired,
      getMangaGenres: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      const { navigation: { state: { params: { mangaDirectoryUrl, searchPath, scrollFilter } = {} } } } = props;
      this.filter = scrollFilter ? new ScrollingFilter(mangaDirectoryUrl, searchPath) : new Filter(mangaDirectoryUrl, searchPath);
      // this.state = { currentPage: 1 };
    }

    componentDidMount() {
      const { getMangaList, navigation: { state: { params: { moduleName } = {} } }, changeModule } = this.props;

      this.moduleName = moduleName || this.moduleName;

      changeModule(this.moduleName);
      getMangaList(this.filter.getFilterString(), this.moduleName);
      this.initializeGenres();
    }

    keyExtractor = (item, index) => item.name || index.toString();

    initializeGenres = async () => {
      const { getMangaGenres } = this.props;
      getMangaGenres(this.moduleName);
    }

    openMangaLink = (manga) => {
      const { navigation: { navigate, state: { params } } } = this.props;
      navigate(screenNames.ChaptersList.name, { manga, moduleName: this.moduleName, ...params });
    }

    onPressNextPage = () => {
      const { getMangaList } = this.props;
      this.filter.nextPage();
      getMangaList(this.filter.getFilterString(), this.moduleName);
    }

    onPressPrevPage = () => {
      const { getMangaList } = this.props;
      this.filter.prevPage();
      getMangaList(this.filter.getFilterString(), this.moduleName);
    }

    generateGenreCheckboxes = () => {
      const { store: { mangaGenres } } = this.props;
      if (mangaGenres === null || mangaGenres === undefined) {
        return <ActivityIndicator />;
      }
      return (
        <FlatList
          style={styles.flatListCheckboxes}
          numColumns={3}
          data={mangaGenres}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <View key={item.index} style={styles.checkbox}>
              <CheckBox value={item.isActive} onValueChange={this.changeCheckbox(item.index)} />
              <Text style={styles.checkboxText}>
                {item.name}
              </Text>
            </View>
          )}
        />
      );
    }

    changeCheckbox = index => () => {
      const { store: { mangaGenres }, changeGenreCheckbox } = this.props;
      if (mangaGenres && mangaGenres[index]) {
        changeGenreCheckbox(index, !mangaGenres[index].isActive);
        if (mangaGenres[index].isActive) {
          this.filter.removeGenre(mangaGenres[index]);
        } else {
          this.filter.addGenre(mangaGenres[index]);
        }
      }
    }

    onPressStartSearch = () => {
      const { getMangaList } = this.props;
      this.filter.setPage(1);
      getMangaList(this.filter.getFilterString());
    }

    handleRightArrowPress = () => {
      this.scrollView.scrollToEnd();
    }

    generateMangaList = () => {
      const { store: { mangaList: { list } } } = this.props;
      return (
        list && (
        <FlatList
          data={list}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => {
            if (!item.name) {
              return false;
            }
            return (
              <TouchableOpacity onPress={() => { this.openMangaLink(item); }} style={styles.touchableOpacity}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item.img }}
                />
                <Text style={styles.itemScore}>{item.itemScore}</Text>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{`${item.name}`}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        )
      );
    }

    render() {
      const { store: { mangaList: { isLoading }, mangaGenres } } = this.props;
      return (
        <ScrollView ref={ref => this.scrollView = ref} pagingEnabled horizontal style={styles.container}>
          <View style={styles.contentContainer}>
            {this.generateMangaList()}
            <TouchableOpacity style={styles.rightButtonTouch} onPress={this.handleRightArrowPress}>
              <Image
                source={rightArrow}
                style={styles.rightButtonImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerFinderOpened}>
            <Button
              onPress={isLoading ? () => null : this.onPressPrevPage}
              title="Prev Page"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={isLoading ? () => null : this.onPressNextPage}
              title="Next Page"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              style={styles.findButton}
              onPress={this.onPressStartSearch}
              title="Find"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            {mangaGenres && (
            <View style={styles.checkboxes}>
              {this.generateGenreCheckboxes()}
            </View>
            )}
          </View>
        </ScrollView>
      );
    }
}

const mapStateToProps = state => ({
  store: state.appReducer,
});

const mapDispatchToProps = dispatch => ({
  getMangaList: bindActionCreators(fetchMangaListAsync, dispatch),
  getMangaGenres: bindActionCreators(fetchMangaGenresAsync, dispatch),
  searchManga: bindActionCreators(searchMangaAsync, dispatch),
  changeGenreCheckbox: bindActionCreators(setGenreCheckbox, dispatch),
  changeModule: bindActionCreators(changeModuleName, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Site);
