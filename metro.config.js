// Importa la función `getDefaultConfig` desde el paquete `expo/metro-config`
// Esta función se utiliza para obtener la configuración predeterminada de Metro, el empaquetador de React Native
const { getDefaultConfig } = require('expo/metro-config');

// Obtiene la configuración predeterminada de Metro para el proyecto
const config = getDefaultConfig(__dirname);

// Agrega soporte para archivos `.env`
// Esto permite que Metro reconozca archivos con la extensión `.env` como parte del proyecto
config.resolver.sourceExts = [...config.resolver.sourceExts, 'env'];

// Exporta la configuración personalizada para que Metro la utilice
module.exports = config;