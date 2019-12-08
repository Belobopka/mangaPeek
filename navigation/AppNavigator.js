
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ChaptersListScreen from '../screens/ChaptersListScreen';
import ChapterScreen from '../screens/ChapterScreen';
import SiteScreen from '../screens/SiteScreen';


export default createStackNavigator({ 
    Home: { screen: HomeScreen }, 
    ChaptersList: { screen: ChaptersListScreen }, 
    Chapter: { screen: ChapterScreen }, 
    Site: { screen: SiteScreen } 
});
