import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './src/routes/AppStack';
import { AppLoading } from 'expo';
import Landing from './src/pages/Landing'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function App() {

  let [fontLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontLoaded) {
    return <AppLoading/>;
  } else {

    return (
      /*fragment(deixar as tag vazias)*/
      <>
        <AppStack />
        <StatusBar style="dark"/>
      </>
    );
  }
}





