/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import MappedItem from './MappedItem';

const keyExtractor = (item, index) => item.name || index.toString();

export default React.memo(({ list, openMangaLink, category: { styles } }) => (
  list.map(
    (item, index) => (
      <MappedItem
        styles={styles}
        openMangaLink={openMangaLink}
        item={item}
        key={keyExtractor(item.name, index)}
      />
    ),
  )
));
