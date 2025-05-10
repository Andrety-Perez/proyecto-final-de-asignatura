import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP
import { TMDB_API_KEY } from '../config/env'; // Importa la clave de la API desde el archivo de configuración

// Crea una instancia de Axios con la URL base de la API de TMDB
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // URL base para todas las solicitudes a la API de TMDB
});

// Función para obtener películas populares
export const getPopularMovies = async (page: number) => {
  try {
    // Realiza una solicitud GET a la API para obtener películas populares
    const response = await api.get(`/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`);
    return response.data.results; // Devuelve solo los resultados de las películas
  } catch (error) {
    console.error('Error al obtener películas populares', error); // Manejo de errores
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

// Función para buscar películas por nombre
export const searchMovies = async (query: string) => {
  try {
    // Realiza una solicitud GET a la API para buscar películas
    const response = await api.get(`/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${query}`);
    return response.data.results; // Devuelve solo los resultados de la búsqueda
  } catch (error) {
    console.error('Error al buscar películas', error); // Manejo de errores
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

// Función para obtener el tráiler de una película
export const getMovieTrailer = async (movieId: number) => {
  try {
    // Realiza una solicitud GET a la API para obtener los videos de una película
    const response = await api.get(`/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=es-ES`);
    // Filtra los resultados para obtener solo los trailers de YouTube
    const trailers = response.data.results.filter((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
    // Devuelve la URL del primer tráiler o `null` si no hay trailers disponibles
    return trailers.length > 0 ? `https://www.youtube.com/watch?v=${trailers[0].key}` : null;
  } catch (error) {
    console.error('Error al obtener el trailer de la película', error); // Manejo de errores
    return null; // Devuelve `null` en caso de error
  }
};

// Función para obtener la lista de géneros de películas
export const getGenres = async () => {
  try {
    // Realiza una solicitud GET a la API para obtener la lista de géneros
    const response = await api.get(`/genre/movie/list?api_key=${TMDB_API_KEY}&language=es-ES`);
    return response.data.genres; // Devuelve la lista de géneros
  } catch (error) {
    console.error('Error al obtener géneros', error); // Manejo de errores
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

// Función para obtener películas por género
export const getMoviesByGenre = async (genreId: number) => {
  try {
    // Realiza una solicitud GET a la API para obtener películas de un género específico
    const response = await api.get(`/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&with_genres=${genreId}`);
    return response.data.results; // Devuelve las películas del género
  } catch (error) {
    console.error('Error al obtener películas por género', error); // Manejo de errores
    return []; // Devuelve un arreglo vacío en caso de error
  }
};