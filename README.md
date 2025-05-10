# Filmicoo

Filmicoo es una aplicación móvil desarrollada con React Native que permite a los usuarios explorar información sobre películas, incluyendo detalles como el título, descripción, y más. Este proyecto utiliza la API de TMDB para obtener datos de películas.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Andrety-Perez/proyecto-final-de-asignatura.git
   cd filmicoo
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega tu clave de API de TMDB:
     ```env
     TMDB_API_KEY=tu_clave_de_api
     ```

4. Inicia la aplicación:
   ```bash
   npm start/npx expo start
   ```

5. Sigue las instrucciones en la terminal para ejecutar la aplicación en un emulador o dispositivo físico.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
filmicoo/
├── assets/                # Recursos estáticos como imágenes
├── src/                  # Código fuente principal
│   ├── components/       # Componentes reutilizables
│   │   ├── FlipCard.tsx  # Componente para mostrar tarjetas con animación de volteo
│   │   └── MovieCard.tsx # Componente para mostrar información de una película
│   ├── config/           # Configuración del proyecto
│   │   ├── env.ts        # Configuración de variables de entorno para desarrollo
│   │   └── env.web.ts    # Configuración de variables de entorno para web
│   ├── navigation/       # Configuración de la navegación
│   │   └── Navigation.tsx # Configuración de las rutas de la aplicación
│   ├── screens/          # Pantallas principales de la aplicación
│   │   ├── DetailScreen.tsx # Pantalla de detalles de una película
│   │   └── HomeScreen.tsx   # Pantalla principal con la lista de películas
│   ├── services/         # Servicios para interactuar con APIs
│   │   └── tmdbApi.ts    # Servicio para consumir la API de TMDB
├── app.json              # Configuración de la aplicación
├── package.json          # Dependencias y scripts del proyecto
├── tsconfig.json         # Configuración de TypeScript
└── metro.config.js       # Configuración del bundler Metro
```

## Lógica del Proyecto

### Componentes

- **FlipCard.tsx**: Este componente muestra una tarjeta que puede voltearse para revelar más información. Utiliza animaciones para mejorar la experiencia del usuario.
- **MovieCard.tsx**: Componente que muestra información básica de una película, como el título y la imagen del póster.

### Pantallas

- **HomeScreen.tsx**: Pantalla principal que muestra una lista de películas obtenidas de la API de TMDB. Implementa lógica para manejar la paginación y la búsqueda.
- **DetailScreen.tsx**: Pantalla que muestra detalles específicos de una película seleccionada, como la descripción, calificación, y más.

### Servicios

- **tmdbApi.ts**: Contiene funciones para interactuar con la API de TMDB, como obtener la lista de películas populares o buscar películas por título.

### Configuración

- **env.ts y env.web.ts**: Archivos para manejar las variables de entorno según el entorno de ejecución (desarrollo o web).

### Navegación

- **Navigation.tsx**: Configura las rutas de la aplicación utilizando `react-navigation`. Define las pantallas disponibles y sus parámetros.

## Derechos Reservados

Filmicoo fue creado por **Andrety Perez** y **Sergio Orozco**. Todos los derechos reservados.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Agradecimientos

Este proyecto utiliza la API de TMDB para obtener información sobre películas. Agradecemos a [TMDB](https://www.themoviedb.org/) por proporcionar acceso a su API.
