# Prueba Vocacional UCAB – React App

Esta aplicación es una prueba vocacional interactiva, diseñada con un estilo ultra moderno tipo B2B SaaS startup, usando los colores institucionales de la Universidad Católica Andrés Bello (azul #003366 y naranja #ff9900), fuentes Poppins y acentos en gris claro.

## Flujo de la aplicación
1. **Pantalla de Bienvenida**: Presentación y botón para comenzar.
2. **Recolección de Datos**: Formulario para nombre y correo electrónico.
3. **Cuestionario**: 5 preguntas (3 cerradas, 2 abiertas) con navegación y barra de progreso.
4. **Resultados**: Carreras recomendadas y descripciones hardcodeadas.

## Estructura principal
- `src/components/WelcomeScreen.jsx`
- `src/components/DataCaptureForm.jsx`
- `src/components/Question.jsx`
- `src/components/ResultsScreen.jsx`
- `src/questions.js` (preguntas hardcodeadas)

## Estilos
Estilos modernos en `src/App.css` con degradados, bordes redondeados y tipografía Poppins.

## Uso
1. Instala dependencias:
   ```powershell
   npm install
   ```
2. Inicia la app:
   ```powershell
   npm run dev
   ```

Abre la URL local que aparece en consola para ver la app.
