/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Progress from 'react-native-progress';


import { fetchChapter, rejectChapterLoad } from '../actions';
import { setLoadingState } from '../actions/common';
import { screenNames } from '../constants/consts';
import styles from './styles/Chapter';

const Header = ({ chapter: { name } }) => (
  <View style={styles.header}>
    <Text>{name}</Text>
  </View>
);

class Chapter extends React.Component {
    static navigationOptions = ({ navigation: { state: { params: { chapter } = {} } } }) => ({
      headerTitle: <Header chapter={chapter} />,
    });

    state = { preload: false, list: [] };

    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
      fetchChapter: PropTypes.func.isRequired,
      changeLoadingState: PropTypes.func.isRequired,
      rejectChapterLoad: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const {
        navigation: { state: { params: { moduleName, chapter, index } = {} } }, fetchChapter, changeLoadingState,
        mangaChaptersList,
      } = this.props;
      changeLoadingState(true, 'imagesInfo.imagesArray');
      fetchChapter(chapter.link, moduleName, index);
      if (mangaChaptersList.length > index + 1) {
        fetchChapter(mangaChaptersList[index + 1].link, moduleName, index + 1, true, true);
      }
    }

    shouldComponentUpdate(nextProps) {
      const { imagesPreload: { imagesPreviewList: prevPreviewList }, images: prevImages, navigation } = this.props;
      const {
        imagesPreload: { imagesPreviewList: nextPreviewList },
        images,
        navigation: { state: { params: { chapter } = {} } },
      } = nextProps;
      if (prevPreviewList !== nextPreviewList) {
        return false;
      }

      if ((chapter === navigation.state.params.chapter)
            && images.isLoading === prevImages.isLoading && images.progressBar === prevImages.progressBar) {
        const diffImages = images.imagesList && images.imagesList.find((image, index) => image.url !== (prevImages.imagesList
                && prevImages.imagesList[index] && prevImages.imagesList[index].url));
        if (!diffImages) {
          return false;
        }
      }
      return true;
    }

    componentDidUpdate(prevProps) {
      const {
        navigation: { state: { params: { moduleName, chapter, index } = {} } }, fetchChapter, changeLoadingState,
        mangaChaptersList, imagesPreload: { imagesPreviewList, preloadIndex },
      } = this.props;
      const { navigation } = prevProps;
      if (chapter !== navigation.state.params.chapter) {
        if (preloadIndex === index) {
          this.setState({ preload: true, list: imagesPreviewList });
          if (mangaChaptersList.length > index + 1) {
            fetchChapter(mangaChaptersList[index + 1].link, moduleName, index + 1, true, true);
          }
          changeLoadingState(false, 'imagesInfo.imagesArray');
          return;
        }
        changeLoadingState(true, 'imagesInfo.imagesArray');
        fetchChapter(chapter.link, moduleName, index);
      }
    }

    componentWillUnmount() {
      const { changeLoadingState, rejectChapterLoad } = this.props;
      changeLoadingState(true, 'imagesInfo.imagesArray');
      rejectChapterLoad();
    }

    keyExtractor = (item, index) => item.name || index.toString();

    onLastImage = () => {
      const {
        navigation: { navigate, state: { params: { moduleName, index } = {} } },
        mangaChaptersList, changeLoadingState,
      } = this.props;
      changeLoadingState(true, 'imagesInfo.imagesArray');
      if (mangaChaptersList.length > index + 1) {
        navigate(screenNames.Chapter.name, { moduleName, index: index + 1, chapter: mangaChaptersList[index + 1] });
      }
    }

    renderCorrectView = () => {
      const { images: { imagesList } } = this.props;
      const { list, preload } = this.state;
      const imageUrls = preload ? list : imagesList;
      return (
        <ImageViewer
          saveToLocalByLongPress={false}
          onArrayEnd={this.onLastImage}
          imageUrls={imageUrls}
          enablePreload
        />
      );
    }

    render() {
      const { images: { isLoading, progressBar } } = this.props;
      return (
        <View style={styles.container}>
          {isLoading
            ? (
              <View style={styles.progressContainer}>
                <Progress.Circle size={80} showsText progress={progressBar} />
              </View>
            )
            : this.renderCorrectView()
                }
        </View>
      );
    }
}

Chapter.displayName = 'ChapterScreen';

const mapStateToProps = ({
  appReducer: {
    mangaChapters: { mangaChaptersList },
    imagesInfoPreload: {
      imagesArray: { list: imagesPreviewList, index: preloadIndex },
    },
    imagesInfo: {
      err,
      progressBar,
      imagesArray: { list: imagesList, isLoading },
    },
  },
}) => ({
  images: { imagesList, isLoading, progressBar },
  imagesPreload: { imagesPreviewList, preloadIndex },
  mangaChaptersList,
  err,
});

const mapDispatchToProps = dispatch => ({
  fetchChapter: bindActionCreators(fetchChapter, dispatch),
  changeLoadingState: bindActionCreators(setLoadingState, dispatch),
  rejectChapterLoad: bindActionCreators(rejectChapterLoad, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
