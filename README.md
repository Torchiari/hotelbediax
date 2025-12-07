# HotelBediaX - Destinations Management Module

![HotelBediaX]

Este proyecto es una **aplicación web para la gestión de destinos turísticos**, desarrollada para HotelBediaX, uno de los principales clientes ficticios en el sector hotelero.  
La aplicación permite crear, leer, actualizar y eliminar destinos, así como filtrarlos y paginarlos. Está diseñada como un **Single Page Application (SPA)** con React, y preparada para manejar un gran volumen de datos.

---

## 🔹 Tecnologías utilizadas

**Frontend:**
- React + Next.js
- TailwindCSS para estilos y diseño responsive
- React Hot Toast para notificaciones y feedback al usuario
- Hooks de React para gestión de estado

**Backend:**
- API simulada con Node.js (mock)  
  *(puede reemplazarse fácilmente con un backend real en Node.js, .NET, Java, etc.)*

**Otros:**
- GitHub para control de versiones
- Vercel / Netlify (opcional) para despliegue frontend
- Soporte para más de 200,000 destinos mediante paginación y filtros

---

## 🔹 Funcionalidades implementadas

### CRUD completo de destinos
- **Crear destino:** se puede agregar un nuevo destino con nombre, descripción, país, región y rating.
- **Leer destino:** se listan todos los destinos con paginación, filtrado y ordenamiento.
- **Actualizar destino:** se puede editar cualquier campo de un destino existente.
- **Eliminar destino:** elimina el destino tras confirmación del usuario.

### Filtros y ordenamiento
- Búsqueda por texto
- Filtrado por país, región
- Filtrado por rating mínimo y máximo
- Ordenamiento por nombre, rating, fecha de creación o fecha de actualización

### Paginación
- Paginación funcional con botones **Prev** y **Next**
- Números de ID únicos por página para mantener consistencia
- Preparada para manejar grandes cantidades de datos sin afectar la performance

### Feedback visual
- Notificaciones de éxito o error mediante **react-hot-toast**
- Validaciones básicas en formularios (por ejemplo, rating entre 0 y 5, nombre obligatorio)

---

## 🔹 Instalación y ejecución

Sigue estos pasos para levantar el proyecto desde cero:

### 1️⃣ Clonar el repositorio
```
git clone https://github.com/tu-usuario/hotelbediax.git
cd hotelbediax
```

### 2️⃣ Backend

``` 
cd backend/src/HotelBediaX.Api
dotnet restore
dotnet watch run
```
Esto levantará la API REST en .NET 7.
Swagger para probar los endpoints: http://localhost:5113/swagger

### 3️⃣ Frontend
```
cd frontend
npm install
npm run dev
```
Esto arrancará el frontend de React.
Por defecto estará disponible en: http://localhost:5173/
Si el puerto difiere, revisa la salida de la terminal de Vite.

### 4️⃣ Configuración (opcional)
Actualmente la API está simulada, por lo que no requiere base de datos.  
Si quieres conectar un backend real, reemplaza los endpoints en `/api/destinations.ts`.

---

## 🔹 Estructura del proyecto

```
/components     -> Componentes reutilizables (Tabla, Formularios, Filtros)
/hooks          -> Hooks personalizados (useDestinations)
/pages          -> Páginas de Next.js
/api            -> Funciones de CRUD (simuladas o conexión real)
```

**DestinationsPage.tsx:** página principal del módulo de destinos.  
**DestinationsTable.tsx:** tabla con CRUD y paginación.  
**DataSelector.tsx:** filtros y búsqueda de destinos.  
**DestinationFormModal.tsx:** modal para crear o editar destinos.

---

## 🔹 Cómo usar la aplicación

1. **Crear un destino:** haz click en `+ Create`, completa el formulario y guarda.  
2. **Editar un destino:** haz click en `Edit` sobre el destino que quieras modificar.  
3. **Eliminar un destino:** haz click en `Delete` y confirma.  
4. **Filtrar destinos:** utiliza la barra de búsqueda, los campos de país/región o los rangos de rating.  
5. **Navegar entre páginas:** usa los botones `Prev` y `Next` para recorrer todos los destinos.

---

## 🔹 Tests

Este proyecto incluye tests para **backend** y **frontend**.

### Backend (.NET)

- Ejecutados con **xUnit**.
- Comprobar entidades, servicios y lógica.

**Ejecutar:**
```
cd backend
dotnet restore
dotnet test
```

### Frontend (React)

- Ejecutados con **Vitest** + **React Testing Library**.
- Verifican componentes y rutas.

**Ejecutar:**
```
cd frontend
npm install
npm run test
```

---

## 🔹 Notas importantes

- El proyecto está diseñado como **SPA**, usando React y Hooks.
- Preparado para manejar **gran cantidad de destinos** mediante paginación y filtros.
- El backend actual es un **mock**, fácil de reemplazar por una API real en Node.js, .NET o cualquier lenguaje.
- Incluye **feedback visual** y validaciones básicas para mejorar la experiencia de usuario.

---

