import React, { ReactNode } from 'react'
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';
import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

interface PageHeaderProps {
    title: string,
    headerRightFilter?: ReactNode,
}


const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ title, children, headerRightFilter }) => {


    const navigation = useNavigation();


    function handleGoBack() {
        navigation.navigate('Landing');

    }
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoImage} resizeMode="contain" />
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRightFilter}
            </View>

            {children}
        </View>
    );
}

export default PageHeader;