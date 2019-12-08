/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

const DESCRIPTION_LENGTH = 1002;

const IMAGE_WIDTH = 50;
const IMAGE_HEIGTH = 50;
const IMAGE_WIDTH_EXPANDED = 200;
const IMAGE_HEIGTH_EXPANDED = 200;

const animation = ({ height, width }) => ({ toHeight, toWidth }) => Animated.parallel(
  [
    Animated.timing(
      height,
      {
        toValue: toHeight,
        duration: 1000,
      },
    ),
    Animated.timing(
      width,
      {
        toValue: toWidth,
        duration: 1000,
      },
    ),
  ],
);

const Title = ({ manga, styles, mangaInfo }) => {
  // const [expanded, toggleExpand] = useState(false);
  const [width] = useState(new Animated.Value(IMAGE_WIDTH));
  const [height] = useState(new Animated.Value(IMAGE_HEIGTH));
  const [animateWorks, onChangeAnimate] = useState({ isLoading: false, state: 0 });
  const animationToggle = animation({ height, width });
  const onToggle = () => {
    if (animateWorks.isLoading) {
      return;
    }
    onChangeAnimate({ state: animateWorks.state ? 0 : 1 });
    animationToggle({ toHeight: IMAGE_HEIGTH_EXPANDED, toWidth: IMAGE_WIDTH_EXPANDED }).start();
  };

  return (
    <View styles={styles.titleContainer}>
      <TouchableOpacity onPress={onToggle}>
        {
            manga.img && (
            <Animated.Image
              source={{ uri: manga.img }}
              style={{ ...styles.titleImage, height, width }}
            />
            )}
        {
            mangaInfo && mangaInfo.description
            && (
            <View style={styles.itemTextContainer}>
              <Text style={styles.desctiption}>
                {`${mangaInfo.description.slice(0, DESCRIPTION_LENGTH)}${mangaInfo.description.length > DESCRIPTION_LENGTH ? ' more...' : ''}`}
              </Text>
            </View>
            )
          }
        {
            mangaInfo && mangaInfo.genresArray
            && (
            <View style={styles.genreTextContainer}>
              {mangaInfo.genresArray.map(item => (
                <View key={item.title} style={styles.itemTextContainer}>
                  <Text style={styles.genre}>{`${item.title}`}</Text>
                </View>
              ))}
            </View>
            )
        }
      </TouchableOpacity>
    </View>
  );
};

Title.propTypes = {
  manga: PropTypes.shape({}).isRequired,
  styles: PropTypes.shape({}).isRequired,
  mangaInfo: PropTypes.shape({
    mangaGenres: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export default Title;
