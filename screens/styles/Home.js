import { StyleSheet } from 'react-native';

import vars from './vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.darknessWhite,
  },
  touchableOpacity: {
    marginTop: 25,
  },
  siteImage: {
    width: vars.width,
    height: 100,
    backgroundColor: vars.red,
  },
  hotRelease: {
    flex: 1,
    alignSelf: 'center',
    width: vars.width / 1.1,
  },
  blockName: {
    fontWeight: 'bold',
    fontSize: 35,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: '3%',
    textShadowOffset: { width: 2, height: 2 },
  },
  hotReleaseSecond: {
    flex: 1,
    backgroundColor: vars.blue,
  },
  rightButtonImage: {
    width: 50,
    height: 50,
  },

  siteContainer: {
    width: vars.width,
  },
});
