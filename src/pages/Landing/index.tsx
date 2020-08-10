import React, { useState,useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../Services/api';

import styles from './style';
import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import purpleHeart from '../../assets/images/icons/heart.png';

function Landing() {

    const navigation = useNavigation();
    const [totalConnections, setTotalConnetions] = useState(0);

    {/*substituir o useEffect poruque toda vez que clickar no botão 'entrar em contato' atualizar o número de conexões */}
    useFocusEffect( () => {
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnetions(total);
        })
    });



    function handleNavigateToGiveClassesPage() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigation.navigate("Study");
    }

    return (
        <View style={styles.container} >
            <Image source={landingImage} style={styles.banner} />
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}> O quê deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                {/*Passando mais de uma estilo para o button*/}
                <RectButton 
                    onPress={handleNavigateToStudyPages}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                
                    onPress={handleNavigateToGiveClassesPage}
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>Total de {totalConnections} conexões já relizadas {' '}
                <Image source={purpleHeart} />
            </Text>
        </View>
    );
}

export default Landing;