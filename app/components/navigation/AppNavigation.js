import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Screens } from '../../constants/NavConstants';
import HomeScreen from '../screens/HomeScreen';
import SecondScreen from '../screens/SecondScreen';

const AppNavigation = createStackNavigator({
  [Screens.Home]: HomeScreen,
  [Screens.Page2]: SecondScreen,
}, {
  headerMode: 'none',
});

export default createAppContainer(AppNavigation);
