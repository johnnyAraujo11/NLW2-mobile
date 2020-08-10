import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'


import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../Services/api';



export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    price: number,
    name: string,
    subject: string,
    whatsapp: string,
}

interface TeacherItemProps {
    teacher: Teacher,
    favored?: boolean
}


const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher, favored }) => {

    const [isFavored, setIsFavored] = useState(favored);


    function handleLinkToWhatsapp() {

        api.post('connections', {
            user_id: teacher.id,
        })
        {/*para abrir o whatssap automático para enviar a mensagem */ }
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    {/*Funçãod e favoritar um professor*/ }
    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];
        
        if (favorites) {
            //convertem em array
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavored) {
            //remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem : Teacher) =>{
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavored(false); 
        } else {
            //adicionar aos favoritos

            favoritesArray.push(teacher);

            setIsFavored(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {/*para essa imagem aparecer é preciso que no estilo dê uma altura e uma largura para ela */}
                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora{'  '}
                    <Text style={styles.priceValue}>R$ {teacher.price}</Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[styles.favoriteButton, isFavored ? styles.favored : {}]}>
                        {isFavored ? <Image source={unFavoriteIcon} /> : <Image source={heartOutLineIcon} />}
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton} >
                        <Image source={whatsappIcon} />
                        <Text style={styles.buttonContactText}>Entrar em contato.</Text>
                    </RectButton>

                </View>
            </View>
        </View>
    );
}
export default TeacherItem;