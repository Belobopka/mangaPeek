/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Footer from '../components/common/Footer';
import Title from '../components/common/Title';
import { getMangaChaptersList, fetchAll } from '../actions';
import { screenNames } from '../constants/consts';
import styles from './styles/ChaptersList';

// TODO сделать описание по кнопке, можно респонсив менять разрешение картинки через transition/animation, чтобы выезжала красиво.
// текст описания сделать более читабельным. добавить more поддержку.
// TODO Проработать ссылки жанров. Должны перенаправлять на страницу фильтра, с выбранными жанрами.
// Разобраться с ломающимся списком мангки выбор с блока --> назад --> переход на страницу сайта --> пропадает список манги
class ChaptersList extends React.Component {
    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
      isLoading: PropTypes.bool,
      mangaChaptersList: PropTypes.arrayOf(PropTypes.shape({})),
      mangaInfo: PropTypes.shape({
        mangaGenres: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
      }),
      getMangaChapters: PropTypes.func.isRequired,
    };

    static defaultProps = {
      isLoading: true,
      mangaChaptersList: [],
      mangaInfo: {},
    };

    componentDidMount() {
      const { navigation: { state: { params: { manga, moduleName } = {} } }, getMangaChapters } = this.props;
      if (manga) {
        getMangaChapters(manga.link, moduleName);
      }
    }

    openChapter = (chapter, index) => {
      const { navigation: { navigate, state: { params: { moduleName, ...other } = {} } } } = this.props;
      navigate(screenNames.Chapter.name, {
        chapter, moduleName, index, ...other,
      });
    }

    keyExtractor = (item, index) => item.name || index.toString();

    // TODO  feature/novel downloading support
    // downloadAllNovel = () => {
    //   const {
    //     navigation: { state: { params: { moduleName } = {} } },
    //     mangaChaptersList,
    //     downloadAll,
    //   } = this.props;
    //   downloadAll(moduleName, mangaChaptersList);
    // }

    render() {
      const {
        isLoading,
        mangaChaptersList,
        mangaInfo,
        navigation: { state: { params: { manga } = {} } },
      } = this.props;
      return (
        isLoading
          ? <ActivityIndicator />
          : (
            <React.Fragment>
              <View style={styles.container}>
                <Title styles={styles} manga={manga} mangaInfo={mangaInfo} />
                <FlatList
                  data={mangaChaptersList}
                  style={styles.flatList}
                  keyExtractor={this.keyExtractor}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.openChapter(item, index)}>
                      <View style={styles.itemTextContainer}>
                        <Text style={styles.itemText}>{`${item.name}`}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </React.Fragment>
          ));
    }
}

const mapStateToProps = ({ appReducer: { mangaChapters: { mangaChaptersList, isLoading }, mangaInfo } = {} }) => ({
  mangaChaptersList,
  isLoading,
  mangaInfo,
});

const mapDispatchToProps = dispatch => ({
  getMangaChapters: bindActionCreators(getMangaChaptersList, dispatch),
  downloadAll: bindActionCreators(fetchAll, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
