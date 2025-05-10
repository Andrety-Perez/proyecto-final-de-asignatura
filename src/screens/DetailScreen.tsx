// Importación de librerías y componentes necesarios
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { getMovieTrailer } from '../services/tmdbApi';

// Definición de tipos para las rutas y parámetros
type RootStackParamList = {
  Inicio: undefined;
  Detalles: { movie: Movie };
};

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  backdrop_path: string;
  original_language: string;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detalles'>;

type Props = {
  route: DetailScreenRouteProp;
};

export default function DetailScreen({ route }: Props) {
  // Extraer parámetros de la ruta
  const { movie } = route.params;

  // Estados para manejar el trailer y el modal
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Efecto para obtener el trailer al montar el componente
  useEffect(() => {
    const fetchTrailer = async () => {
      const url = await getMovieTrailer(movie.id);
      setTrailerUrl(url);
      setLoadingTrailer(false);
    };

    fetchTrailer();
  }, [movie.id]);

  // Función para abrir el modal
  const openModal = () => setIsModalVisible(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contenedor de la imagen principal */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', '#121212']}
          style={styles.gradient}
        />
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {/* Contenedor del trailer */}
      <View style={styles.trailerContainer}>
        {loadingTrailer ? (
          <ActivityIndicator size="large" color="#9c9c9c" />
        ) : trailerUrl ? (
          <TouchableOpacity style={styles.trailerButton} onPress={openModal}>
            <Text style={styles.trailerButtonText}>Ver Trailer</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noTrailerText}>No hay trailer disponible</Text>
        )}
      </View>

      {/* Modal para mostrar el trailer */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            {trailerUrl && (
              <WebView
                source={{ uri: `${trailerUrl}?autoplay=1` }}
                style={styles.webview}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                onNavigationStateChange={(navState) => {
                  if (
                    navState.url.includes('youtube.com/watch') &&
                    !navState.loading
                  ) {
                    return;
                  }

                  if (!navState.url.includes('youtube.com')) {
                    closeModal();
                  }
                }}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Contenedor de información adicional */}
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{'⭐'.repeat(Math.floor(movie.vote_average / 2))}</Text>
          <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)} / 10</Text>
        </View>
        <Text style={styles.info}>Idioma: {movie.original_language.toUpperCase()}</Text>
        <Text style={styles.info}>Fecha de estreno: {movie.release_date}</Text>
        <Text style={styles.description}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  // Contenedor de la imagen principal
  imageContainer: {
    position: 'relative',
  },
  // Imagen principal
  image: {
    width: '100%',
    height: 250,
  },
  // Gradiente sobre la imagen
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  // Título de la película
  title: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  // Contenedor del trailer
  trailerContainer: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Botón para ver el trailer
  trailerButton: {
    backgroundColor: '#9c9c9c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  // Texto del botón de trailer
  trailerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Texto cuando no hay trailer disponible
  noTrailerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  // Contenedor del modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Contenido del modal
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  // Botón para cerrar el modal
  closeButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    alignItems: 'center',
  },
  // Texto del botón de cerrar
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // WebView para mostrar el trailer
  webview: {
    flex: 1,
  },
  // Contenedor de información adicional
  infoContainer: {
    padding: 15,
  },
  // Contenedor de la calificación
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estrellas de calificación
  stars: {
    fontSize: 18,
    color: '#FFD700',
    marginRight: 10,
  },
  // Texto de la calificación
  ratingText: {
    fontSize: 16,
    color: '#fff',
  },
  // Información adicional
  info: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  // Descripción de la película
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 22,
  },
});