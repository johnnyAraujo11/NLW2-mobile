import React, {useState } from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

function Favorites(){
    const [favorites, setFavorites] = useState([]);
    function LoadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const convertFavoritesTeachers = JSON.parse(response);
                setFavorites(convertFavoritesTeachers);
            }
        })
    }
    {/*Essa função é executada toda a vez que a tela entrar em focu */}
    useFocusEffect(() =>{
        LoadFavorites();
    })



    return(
        <View style={styles.container}> 
        <PageHeader title="Meus Proffy favoritos"/>    
        {/*Scroll para rolar a tela */}
        <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24,
            }}>
                
            { favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher}favored={true}/>
                    )
            })}
              
            </ScrollView>    
    </View>
    );

}

export default Favorites;