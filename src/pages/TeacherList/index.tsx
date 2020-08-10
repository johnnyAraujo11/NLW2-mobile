import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

import api from '../../Services/api';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import Favorites from '../Favorites';

function TeacherList() {

    {/*Criando um estado */ }
    const [IsfiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!IsfiltersVisible);
    }

    {/*Conectando na api */ }
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);


    function LoadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const convertFavoritesTeachers = JSON.parse(response);
                const favoredTeachersIds = convertFavoritesTeachers.map((teacher: Teacher) => {
                    return (teacher.id)
                })
                setFavorites(favoredTeachersIds)
            }
        })
    }


    async function handleFiltersSubmit() {
        LoadFavorites();
        const response = await api.get('classes', {
            params: {
                subject, time, week_day
            }
        })
        setTeachers(response.data);
        setIsFiltersVisible(false);
    }

    

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis"
                headerRightFilter={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#fff' />
                    </BorderlessButton>
                )}>

                {IsfiltersVisible && (<View style={styles.searchForm}>

                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Qual a matéria"
                        placeholderTextColor="#c1bccc"
                        value={subject}
                        onChangeText={text => { setSubject(text); }}
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                                value={week_day}
                                onChangeText={text => { setWeek_day(text) }}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Qual horário?"
                                placeholderTextColor="#c1bccc"
                                value={time}
                                onChangeText={text => { setTime(text) }}
                            />
                        </View>
                    </View>
                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}
            </PageHeader>

            {/*Scroll para rolar a tela */}
            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24,
            }}>
                {/*Sem a chaves no TeacherList não precisa colocar o return */}
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favored={favorites.includes(teacher.id)} />
                    )
                })}

            </ScrollView>
        </View>


    );

}

export default TeacherList;