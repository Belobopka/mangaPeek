import { StyleSheet } from 'react-native';

import vars from './vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.darknessWhite,
  },
  contentContainer: {
    width: vars.width,
  },
  findButton: {
    flex: 0.2,
  },
  checkboxes: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 80,
    display: 'flex',
    maxWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    textAlign: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemText: {
    alignSelf: 'flex-end',
  },
  itemScore: {
    position: 'absolute',
    left: '50%',
  },
  rightButtonImage: {
    width: 50,
    height: 50,
  },
  rightButtonTouch: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: 0,
    width: 50,
    height: 50,
  },
  touchableOpacity: {
    marginTop: 25,
    borderBottomColor: vars.red,
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  itemTextContainer: {
    maxWidth: '75%',
    display: 'flex',
    flexDirection: 'row',
  },
  innerFinderOpened: {
    backgroundColor: vars.lightBlue,
    width: vars.width,
    display: 'flex',
    flexDirection: 'column',
  },
});
