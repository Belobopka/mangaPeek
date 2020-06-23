import { StyleSheet } from 'react-native';

import vars from './vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.white,
  },
  itemText: {
    alignSelf: 'flex-end',
  },
  itemScore: {
    position: 'absolute',
    left: '50%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.7,
  },
  touchableOpacity: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: vars.brownWhite,
    paddingTop: 5,
    paddingLeft: 4,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
  },
  itemTextContainer: {
    maxWidth: '85%',
    display: 'flex',
    flexDirection: 'row',
  },
  genreTextContainer: {
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '2%',
  },
  flatList: {
    marginTop: 10,
    flex: 0.3,
  },
  genre: {
    paddingLeft: 5,
    paddingRight: 2,
    marginLeft: 5,
    marginTop: 5,
    borderWidth: 2,
    borderColor: vars.brownWhite,
    borderRadius: 7,
  },
  description: {},
});
