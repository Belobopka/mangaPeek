/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import right_arrow from '../../assets/images/right_arrow.png';
import MangaListBlock from '../MangaList/Block';
import modules from '../../modules';


export default class ModuleBlocks extends React.Component {
  static propTypes = {
    screenNames: PropTypes.PropTypes.shape({}).isRequired,
    navigation: PropTypes.PropTypes.shape({}).isRequired,
    moduleName: PropTypes.string.isRequired,
    homeStyles: PropTypes.PropTypes.shape({}).isRequired,
    getStore: PropTypes.func.isRequired,
  };

  openMangaLink = (moduleName, isNovel) => (manga) => {
    const { navigation: { navigate }, screenNames } = this.props;
    navigate(screenNames.ChaptersList.name, { manga, moduleName, isNovel });
  };

  createBlock = ({
    viewStyles, category, list, moduleName, isNovel, getList, key,
  }) => (
    <View style={viewStyles} key={key}>
      <MangaListBlock
        blockName={category.blockName}
        styles={category.styles}
        list={list}
        getList={getList}
        openMangaLink={this.openMangaLink(moduleName, isNovel)}
      />
    </View>
  );

  openMangaSite = (mod) => {
    const { navigation: { navigate }, screenNames } = this.props;
    navigate(screenNames.Site.name, mod);
  };

  render() {
    const {
      moduleName, homeStyles, getStore, ...other
    } = this.props;
    const moduleBlock = modules[moduleName];
    const { blocksHorizontal, searchPath, mangaDirectoryUrl } = moduleBlock;

    return blocksHorizontal.map((block, index) => {
      const blocks = block.map((item) => {
        const {
          styles, name: blockName, listName, get, viewStyles,
        } = item;
        const list = getStore(listName, moduleName);
        const getList = other[get](moduleName);
        return this.createBlock({
          viewStyles, category: { styles, blockName }, list, getList, key: blockName,
        });
      });
      if (index === 0) {
        return (
        // eslint-disable-next-line react/no-array-index-key
          <View style={homeStyles.siteContainer} key={index}>
            <TouchableOpacity onPress={() => { this.openMangaSite({ moduleName, searchPath, mangaDirectoryUrl }); }} style={homeStyles.touchableOpacity}>
              <Text style={homeStyles.blockName}>
                {moduleName.toUpperCase()}
                <Image
                  source={right_arrow}
                  style={homeStyles.rightButtonImage}
                />
              </Text>
            </TouchableOpacity>
            {blocks}
          </View>
        );
      }
      return (
        <View key={index}>
          {blocks}
        </View>
      );
    });
  }
}
