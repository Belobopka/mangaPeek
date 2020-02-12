import {
  StyleSheet,
} from 'react-native';

import vars from './vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.white,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: vars.darknessWhite,
  },
  header: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
});
