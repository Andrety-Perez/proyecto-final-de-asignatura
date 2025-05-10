import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Biblioteca para animaciones
import { useNavigation } from '@react-navigation/native'; // Hook para manejar la navegación
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipos para la navegación
import { RootStackParamList } from '../navigation/Navigation'; // Tipos de las rutas de navegación

type Props = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    backdrop_path: string;
    original_language: string;
  };
};

// Define el tipo de navegación para la pantalla "Detalles"
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detalles'>;

export default function FlipCard({ movie }: Props) {
  const [flipped, setFlipped] = useState(false); // Estado para controlar si la tarjeta está volteada
  const navigation = useNavigation<NavigationProp>(); // Hook para manejar la navegación

  // Función para voltear la tarjeta
  const handlePress = () => {
    setFlipped(!flipped); // Cambia el estado de "flipped"
  };

  // Función para navegar a la pantalla de detalles
  const handleMoreDetails = () => {
    navigation.navigate('Detalles', { movie }); // Navega a la pantalla "Detalles" con el parámetro "movie"
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.cardContainer}>
        {/* Si la tarjeta está volteada, muestra el lado trasero */}
        {flipped ? (
          <Animatable.View
            key="back" // Clave única para la animación
            animation="flipInY" // Animación de volteo
            duration={600} // Duración de la animación en milisegundos
            style={styles.cardBack} // Estilo del lado trasero
          >
            {/* Imagen de fondo desenfocada */}
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.backgroundImage}
              blurRadius={5} // Desenfoque para el fondo
            />
            <View style={styles.overlay}>
              {/* Título de la película */}
              <Text style={styles.title}>{movie.title}</Text>
              {/* Resumen de la película (limitado a 100 caracteres) */}
              <Text style={styles.overview}>
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </Text>
              {/* Botón para ver más detalles */}
              <TouchableOpacity style={styles.button} onPress={handleMoreDetails}>
                <Text style={styles.buttonText}>Más detalles</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : (
          // Si la tarjeta no está volteada, muestra el lado frontal
          <Animatable.View
            key="front" // Clave única para la animación
            animation="flipInY" // Animación de volteo
            duration={600} // Duración de la animación en milisegundos
            style={styles.cardFront} // Estilo del lado frontal
          >
            {/* Imagen del póster de la película */}
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.image}
            />
          </Animatable.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 200, // Ancho de la tarjeta
    height: 300, // Altura de la tarjeta
    margin: 20, // Margen alrededor de la tarjeta
  },
  cardFront: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    borderRadius: 10, // Bordes redondeados
    overflow: 'hidden', // Asegura que el contenido no se salga de los bordes
  },
  cardBack: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    borderRadius: 10, // Bordes redondeados
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    position: 'relative', // Posiciona elementos relativos al contenedor
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
  },
  image: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
  },
  backgroundImage: {
    position: 'absolute', // Posiciona la imagen detrás del contenido
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa toda la altura del contenedor
    borderRadius: 10, // Bordes redondeados
  },
  overlay: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    padding: 10, // Espaciado interno
  },
  title: {
    fontSize: 18, // Tamaño de la fuente
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centra el texto
    color: '#fff', // Color del texto
    marginBottom: 10, // Espaciado inferior
  },
  overview: {
    fontSize: 14, // Tamaño de la fuente
    textAlign: 'justify', // Justifica el texto
    color: '#fff', // Color del texto
    marginBottom: 10, // Espaciado inferior
  },
  button: {
    backgroundColor: '#9c9c9c', // Color de fondo del botón
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 20, // Espaciado horizontal interno
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Centra el texto horizontalmente
    marginTop: 10, // Espaciado superior
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto del botón
    fontSize: 16, // Tamaño de la fuente
    fontWeight: 'bold', // Texto en negrita
  },
});