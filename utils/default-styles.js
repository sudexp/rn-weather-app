import { StatusBar, StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
