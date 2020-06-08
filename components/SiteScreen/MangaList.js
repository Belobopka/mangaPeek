/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getMangaListItem } from '../../reducers/selectors';

const MangaListItem = ({ item, openMangaLink, styles }) => {
  const onPress = () => openMangaLink(item);
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
      <Image style={styles.itemImage} source={{ uri: item.img }} />
      <Text style={styles.itemScore}>{item.itemScore}</Text>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{`${item.name}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

MangaListItem.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string,
    itemScore: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  openMangaLink: PropTypes.func.isRequired,
  styles: PropTypes.shape({}),
};

MangaListItem.defaultProps = {
  styles: {},
};

const mapStateToPropsMangaListItem = (state, { itemName }) => ({
  item: getMangaListItem(state.appReducer.mangaList.list, itemName),
});

const WrappedMangaListItem = React.memo(
  connect(mapStateToPropsMangaListItem)(MangaListItem),
);

class MangaList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    list: [],
  };

  keyExtractor = (item, index) => item.name || index.toString();

  render() {
    const { list } = this.props;
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
              <WrappedMangaListItem itemName={item.name} {...this.props} />
            );
          }}
        />
      )
    );
  }
}

const mapStateToProps = ({
  appReducer: {
    mangaList: { list },
  },
}) => ({
  list,
});

export default connect(mapStateToProps)(MangaList);
