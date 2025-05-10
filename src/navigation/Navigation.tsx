import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenedor principal para la navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Crea un stack de navegación
import { Animated, Text, StyleSheet, View, Dimensions } from 'react-native'; // Componentes y utilidades de React Native
import HomeScreen from '../screens/HomeScreen'; // Importa la pantalla principal
import DetailScreen from '../screens/DetailScreen'; // Importa la pantalla de detalles

// Define los parámetros de las rutas de navegación
export type RootStackParamList = {
  Inicio: undefined; // Ruta "Inicio" no requiere parámetros
  Detalles: { movie: Movie }; // Ruta "Detalles" requiere un objeto "movie" como parámetro
};

// Define el tipo de datos para una película
type Movie = {
  id: number; // ID único de la película
  title: string; // Título de la película
  poster_path: string; // Ruta del póster de la película
  overview: string; // Resumen de la película
  vote_average: number; // Calificación promedio
  release_date: string; // Fecha de lanzamiento
  backdrop_path: string; // Imagen de fondo de la película
  original_language: string; // Idioma original de la película
};

// Crea el stack de navegación
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente personalizado para el carrusel del encabezado
const HeaderCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current; // Valor animado para el desplazamiento horizontal
  const screenWidth = Dimensions.get('window').width; // Obtiene el ancho de la pantalla

  // Efecto para iniciar la animación al montar el componente
  useEffect(() => {
    const animateScroll = () => {
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -screenWidth * 3, // Desplaza el contenido hacia la izquierda
          duration: 20000, // Duración de la animación (20 segundos)
          useNativeDriver: true, // Usa el driver nativo para mejorar el rendimiento
        })
      ).start(); // Inicia la animación en bucle
    };

    animateScroll(); // Llama a la función para iniciar la animación
  }, [scrollX, screenWidth]); // Dependencias: se ejecuta cuando cambian `scrollX` o `screenWidth`

  return (
    <View style={styles.carouselWrapper}>
      <Animated.View
        style={{
          flexDirection: 'row', // Los textos se colocan en fila
          transform: [{ translateX: scrollX }], // Aplica la animación de desplazamiento
        }}
      >
        {/* Textos duplicados para crear el efecto de bucle continuo */}
        <Text style={styles.carouselText}>FILMICO -- Películas recién lanzadas</Text>
        <Text style={styles.carouselText}>FILMICO -- Las mejores películas del momento</Text>
        <Text style={styles.carouselText}>FILMICO -- Descubre nuevos estrenos</Text>
        <Text style={styles.carouselText}>FILMICO -- Películas recién lanzadas</Text>
        <Text style={styles.carouselText}>FILMICO -- Las mejores películas del momento</Text>
        <Text style={styles.carouselText}>FILMICO -- Descubre nuevos estrenos</Text>
      </Animated.View>
    </View>
  );
};

// Componente principal de navegación
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        {/* Pantalla principal */}
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            headerTitle: () => <HeaderCarousel />, // Usa el carrusel animado como título del encabezado
            headerTitleAlign: 'center', // Centra el título en el encabezado
            headerStyle: {
              backgroundColor: '#121212', // Fondo oscuro para el encabezado
            },
          }}
        />
        {/* Pantalla de detalles */}
        <Stack.Screen
          name="Detalles"
          component={DetailScreen}
          options={{
            headerTitle: 'Detalles de la Película', // Título estático para el encabezado
            headerTitleAlign: 'center', // Centra el título en el encabezado
            headerStyle: {
              backgroundColor: '#121212', // Fondo oscuro para el encabezado
            },
            headerTintColor: '#FFFFFF', // Texto blanco en el encabezado
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos para el carrusel y otros elementos
const styles = StyleSheet.create({
  carouselWrapper: {
    overflow: 'hidden', // Oculta el contenido que se desplaza fuera del área visible
    width: Dimensions.get('window').width, // Ancho del carrusel igual al ancho de la pantalla
    backgroundColor: '#121212', // Fondo oscuro para el carrusel
    paddingVertical: 10, // Espaciado interno vertical
  },
  carouselContainer: {
    flexDirection: 'row', // Los textos se colocan en fila
    alignItems: 'center', // Centra los textos verticalmente
  },
  carouselText: {
    fontSize: 16, // Tamaño de la fuente
    fontWeight: 'bold', // Texto en negrita
    color: '#FFFFFF', // Texto blanco
    marginHorizontal: 20, // Espaciado entre los textos
    textAlign: 'center', // Centra el texto dentro del carrusel
  },
});