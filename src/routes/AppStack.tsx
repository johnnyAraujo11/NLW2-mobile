import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyNavigationTabs from './StudyNavigationTabs';

const {Navigator, Screen} = createStackNavigator();

function AppStack(){
    return(
        <NavigationContainer>
            {/*headerShown é para tirar a barra de navegação padrão do Navigator duas chaves porque estamos colocando um */}
            <Navigator screenOptions={{headerShown: false }}>
                <Screen name="Landing" component={Landing}/>
                <Screen name="GiveClasses" component={GiveClasses}/>
                <Screen name="Study" component={StudyNavigationTabs}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;