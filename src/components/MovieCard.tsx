import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Define el tipo de datos para una película
type Movie = {
  title: string; // Título de la película
  poster_path: string; // Ruta de la imagen del póster
  vote_average: number; // Calificación promedio de la película
};

// Define las propiedades que el componente MovieCard recibirá
type Props = {
  movie: Movie; // Objeto de tipo Movie que contiene los datos de la película
  onPress: () => void; // Función que se ejecutará al presionar la tarjeta
};

// Componente funcional que representa una tarjeta de película
export default function MovieCard({ movie, onPress }: Props) {
  return (
    // Contenedor táctil que ejecuta la función onPress al ser presionado
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Imagen del póster de la película */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} // URL completa del póster
        style={styles.image} // Estilo aplicado a la imagen
      />
      {/* Contenedor para el texto debajo de la imagen */}
      <View style={styles.textContainer}>
        {/* Título de la película */}
        <Text style={styles.title}>{movie.title}</Text>
        {/* Calificación de la película con un ícono de estrella */}
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Estilos para el componente MovieCard
const styles = StyleSheet.create({
  card: {
    margin: 10, // Margen alrededor de la tarjeta
    borderRadius: 10, // Bordes redondeados
    backgroundColor: '#fff', // Fondo blanco para la tarjeta
    elevation: 3, // Sombra para dar un efecto de elevación
    overflow: 'hidden', // Asegura que el contenido no se salga de los bordes redondeados
  },
  image: {
    width: '100%', // La imagen ocupa todo el ancho del contenedor
    height: 300, // Altura fija para la imagen
  },
  textContainer: {
    padding: 10, // Espaciado interno para el texto
  },
  title: {
    fontSize: 16, // Tamaño de la fuente para el título
    fontWeight: 'bold', // Texto en negrita para el título
  },
  rating: {
    marginTop: 5, // Espaciado superior para separar del título
    color: 'gray', // Color gris para la calificación
  },
});