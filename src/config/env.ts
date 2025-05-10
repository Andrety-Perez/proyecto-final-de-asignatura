import { Platform } from 'react-native'; // Importa el módulo Platform para detectar el sistema operativo

// Declara una variable para almacenar la clave de la API de TMDB
let TMDB_API_KEY: string;

// Verifica si la plataforma es "web"
if (Platform.OS === 'web') {
  // Si es "web", importa la clave de la API desde el archivo `env.web.ts`
  TMDB_API_KEY = require('./env.web').TMDB_API_KEY;
} else {
  // Si no es "web" (es decir, es móvil), importa la clave de la API desde otro archivo
  // Nota: Aquí se está utilizando el mismo archivo `env.web.ts` como fallback
  // porque `@env` no está funcionando correctamente.
  //TMDB_API_KEY = require('@env').TMDB_API_KEY; // no reconce el env
  TMDB_API_KEY = require('./env.web').TMDB_API_KEY;
}

// Exporta la clave de la API para que pueda ser utilizada en otras partes del proyecto
export { TMDB_API_KEY };