// Importación de librerías y componentes necesarios
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, ActivityIndicator, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPopularMovies, searchMovies, getGenres, getMoviesByGenre } from '../services/tmdbApi';
import FlipCard from '../components/FlipCard';

export default function HomeScreen() {
  // Definición de estados para manejar datos y lógica de la pantalla
  const [movies, setMovies] = useState<any[]>([]); // Lista de películas
  const [page, setPage] = useState(1); // Página actual para la paginación
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [isSearching, setIsSearching] = useState(false); // Indicador de búsqueda activa
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]); // Lista de géneros
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  // Función para obtener películas populares
  const fetchMovies = async (pageNumber: number) => {
    if (loading) return; // Evitar múltiples solicitudes simultáneas
    setLoading(true);

    try {
      const data = await getPopularMovies(pageNumber);
      setMovies((prevMovies) => (pageNumber === 1 ? data : [...prevMovies, ...data]));
      setPage(pageNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la búsqueda de películas o géneros
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      fetchMovies(1);
      return;
    }

    setLoading(true);
    setIsSearching(true);

    // Buscar por género si coincide con el término de búsqueda
    const genre = genres.find((g) => g.name.toLowerCase() === searchTerm.toLowerCase());
    if (genre) {
      try {
        const data = await getMoviesByGenre(genre.id);
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Buscar por título de película
    try {
      const data = await searchMovies(searchTerm);
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar géneros y películas al montar el componente
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };

    fetchGenres();
    fetchMovies(1);
  }, []);

  // Renderizar cada película en un componente FlipCard
  const renderMovie = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <FlipCard movie={item} />
    </View>
  );

  // Función para mostrar el modal con información de los desarrolladores
  const showDeveloperInfo = () => {
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Campo de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar películas o géneros..."
        placeholderTextColor="#FFFFFF"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          if (text.trim() === '') {
            setIsSearching(false);
            fetchMovies(1);
          }
        }}
        onSubmitEditing={handleSearch}
      />

      {/* Lista de películas */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        numColumns={2}
        contentContainerStyle={styles.list}
        onEndReached={() => !isSearching && fetchMovies(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007BFF" />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          ) : null
        }
      />

      {/* Botón para mostrar información de los desarrolladores */}
      <TouchableOpacity style={styles.developerIcon} onPress={showDeveloperInfo}>
        <Ionicons name="code-slash" size={40} color="#121212" />
      </TouchableOpacity>

      {/* Modal con información de los desarrolladores */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              <Text style={styles.highlight}>Derechos Reservados</Text> de <Text style={styles.brand}>FILMICO</Text>
            </Text>
            <Text style={styles.modalText}>Desarrolladores:</Text>
            <Text style={styles.developerName}>- <Text style={styles.highlight}>Andrety Perez</Text></Text>
            <Text style={styles.developerName}>- <Text style={styles.highlight}>Sergio Orozco</Text></Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
  // Contenedor principal de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  // Estilo para el campo de búsqueda
  searchInput: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9c9c9c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 16,
    color: '#FFFFFF',
  },
  // Contenedor para la lista de películas
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  // Estilo para cada tarjeta de película
  cardWrapper: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 303,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  // Estilo para el botón de desarrolladores
  developerIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9c9c9c',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // Contenedor para el indicador de carga
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  // Texto del indicador de carga
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  // Fondo del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Contenido del modal
  modalContent: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  // Título del modal
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  // Texto del modal
  modalText: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 10,
  },
  // Botón para cerrar el modal
  closeButton: {
    marginTop: 20,
    backgroundColor: '#9c9c9c',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // Texto del botón de cerrar
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo para resaltar texto
  highlight: {
    color: '#fd6e6e',
    fontWeight: 'bold',
  },
  // Estilo para la marca o branding
  brand: {
    color: '#9c9c9c',
    fontWeight: 'bold',
  },
  // Estilo para los nombres de los desarrolladores
  developerName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
});