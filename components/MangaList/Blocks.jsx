import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchCategoryAsync } from '../../actions';
import modules from '../../modules';
import { screenNames } from '../../constants/consts';
import homeStyles from '../../screens/styles/Home';
import BlockTitle from './BlockTitle';
import BlockWrapper from './BlockWrapper';

class HorizontalBlocks extends React.PureComponent {
  static propTypes = {
    navigate: PropTypes.shape({}).isRequired,
    store: PropTypes.shape({}).isRequired,
    getListCategory: PropTypes.func.isRequired,
  };

  getBlockWrapper = ({
    styles, name: blockName, listName, viewStyles, path, customParser,
  }) => {
    const { store: { moduleName, [listName]: { [moduleName]: list } } } = this.props;
    const getList = this.getCategory(moduleName, path, listName, customParser);
    return (
      <BlockWrapper
        viewStyles={viewStyles}
        category={{ styles, blockName }}
        list={list}
        getList={getList}
        key={blockName}
        moduleName={moduleName}
        openMangaLink={this.openMangaLink}
      />
    );
  };

  get blocks() {
    const { store: { moduleName } } = this.props;
    const moduleBlock = modules[moduleName];
    const { blocksHorizontal, searchPath, mangaDirectoryUrl } = moduleBlock;
    const moduleHorizontalBlockList = blocksHorizontal.map((block, index) => {
      const entity = block.map(item => this.getBlockWrapper(item));

      if (index === 0) {
        return (
          <BlockTitle
            openMangaSite={this.openMangaSite({ moduleName, searchPath, mangaDirectoryUrl })}
            homeStyles={homeStyles}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            moduleName={moduleName}
          >
            {entity}
          </BlockTitle>
        );
      }
      return entity;
    });
    return moduleHorizontalBlockList;
  }

  getCategory = (moduleName, path, blockName, customParser) => () => {
    const { getListCategory } = this.props;
    return getListCategory(moduleName, path, blockName, customParser);
  }

  openMangaLink = (manga, moduleName) => {
    const { navigate } = this.props;
    navigate(screenNames.ChaptersList.name, { manga, moduleName });
  };

  openMangaSite = mod => () => {
    const { navigate } = this.props;
    navigate(screenNames.Site.name, mod);
  };

  render() {
    return this.blocks;
  }
}

const mapDispatchToProps = dispatch => ({
  getListCategory: bindActionCreators(fetchCategoryAsync, dispatch),
});

const mapStateToProps = ({ state: { appReducer } }) => ({
  store: appReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBlocks);
