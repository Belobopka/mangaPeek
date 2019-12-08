/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { getMangaChaptersList, fetchAll } from '../actions';
import { screenNames } from '../constants/consts';
import styles from './styles/ChaptersList';

const DESCRIPTION_LENGTH = 1002;

// TODO сделать описание по кнопке, можно респонсив менять разрешение картинки через transition/animation, чтобы выезжала красиво.
// текст описания сделать более читабельным. добавить more поддержку.
// TODO Проработать ссылки жанров. Должны перенаправлять на страницу фильтра, с выбранными жанрами.
// Разобраться с ломающимся списком мангки выбор с блока --> назад --> переход на страницу сайта --> пропадает список манги
class ChaptersList extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({}).isRequired,
        store: PropTypes.shape({}).isRequired,
        getMangaChaptersList: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { navigation: { state: { params: { manga, moduleName } = {} } }, getMangaChaptersList } =  this.props;
        if (manga) {
            getMangaChaptersList(manga.link, moduleName);
        }
    }

    openChapter = (chapter, index) => {
        const { navigation: { navigate, state: { params: { moduleName, ...other } = {} } } } =  this.props;
        navigate(screenNames.Chapter.name, { chapter, moduleName, index, ...other });
    }

    keyExtractor = (item, index) => item.name || index.toString();

    downloadAllNovel = () => {
      const { navigation: { state: { params: { moduleName } = {} } }, store: { mangaChapters: { mangaChaptersList } = {} }, downloadAll } = this.props;
      downloadAll(moduleName, mangaChaptersList);
    }

    render() {
        const { 
          store: { mangaChapters: { mangaChaptersList, isLoading } = {}, mangaInfo }, 
        navigation: { state: { params: { manga } = {} } } } = this.props;
        return (
            isLoading ? 
              <ActivityIndicator /> 
            : (
                <React.Fragment>
                  <View style={styles.container}>
                  {
                    manga.img && (
                    <Image
                      source={{ uri: manga.img }}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  )}
                  { 
                    mangaInfo && mangaInfo.description && 
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.desctiption}>
                        {`${mangaInfo.description.slice(0, DESCRIPTION_LENGTH)}${mangaInfo.description.length > DESCRIPTION_LENGTH ? ' more...' : ''}`}
                      </Text>
                    </View>
                  }
                  { 
                    mangaInfo && mangaInfo.genresArray &&
                    <View style={styles.genreTextContainer}>
                    {mangaInfo.genresArray.map(item => (
                      <View key={item.title} style={styles.itemTextContainer}>
                        <Text style={styles.genre}>{`${item.title}`}</Text>
                      </View>
                    ))}
                    </View>
                  }
                    <FlatList
                      data={mangaChaptersList}
                      keyExtractor={this.keyExtractor}
                      renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.openChapter(item, index)}>
                              <View style={styles.itemTextContainer}>
                                <Text style={styles.itemText}>{`${item.name}`}</Text>
                              </View>
                            </TouchableOpacity>
                          );
                      }}
                    />
                  </View>
                </React.Fragment>
              ));
    }
}

const mapStateToProps = state => ({
    store: state.appReducer,
});

const mapDispatchToProps = dispatch => ({
    getMangaChaptersList: bindActionCreators(getMangaChaptersList, dispatch),
    downloadAll: bindActionCreators(fetchAll, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);