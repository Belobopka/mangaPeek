/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import {
  Text,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

// import styles from './styles/MangaList';
import MappedList from './MappedList';

class Block extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    openMangaLink: PropTypes.func.isRequired,
    category: PropTypes.shape({
      blockName: PropTypes.string,
      styles: PropTypes.shape({
        contentView: PropTypes.shape({}),
        blockName: PropTypes.shape({}),
        flatList: PropTypes.shape({}),
      }),
    }).isRequired,
    getList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: [],
  };

  componentDidMount() {
    const { getList, list } = this.props;
    if (list.length > 0) {
      return;
    }
    getList();
  }

  keyExtractor = (item, index) => item.name || index.toString();

  render() {
    const { list, category: { blockName, styles } } = this.props;
    return (
      list.length > 0 ? (
        <View style={styles.contentView}>
          <Text style={styles.blockName}>
            {blockName}
          </Text>
          <ScrollView
            nestedScrollEnabled
            horizontal
            style={styles.flatList}
          >
            <MappedList {...this.props} />
          </ScrollView>
        </View>
      )
        : <ActivityIndicator />
    );
  }
}

export default Block;
